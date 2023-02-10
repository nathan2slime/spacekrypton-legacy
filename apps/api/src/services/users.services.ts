import bcrypt from 'bcrypt';
import { AppI18nLang } from '@kry/i18n';
import { nanoid } from 'nanoid';

import { getErrorMessage } from '../graphql/errors';
import {
  AuthUser,
  CreateUserInput,
  LoginInput,
  User,
  UserModel,
} from '../graphql/schemas/users.schemas';
import { createAuthToken } from '../utils/token';
import { gqlModelTransform } from '../utils/transform';
import { log } from '../log';

export class UserServices {
  async getById(id: number, lang: AppI18nLang) {
    log.start('user search by id', id);
    const [user] = await UserModel.find({ id });

    if (!user) throw getErrorMessage(721, lang);

    log.complete('user found', id);

    return gqlModelTransform<User>(user);
  }

  async login(data: LoginInput, lang: AppI18nLang): Promise<AuthUser> {
    log.start('user authentication with email', data.email);

    const error = getErrorMessage(725, lang);
    const user = await this.getByEmail(data.email);

    if (!user) throw error;

    const authorized = await bcrypt.compare(data.password, user.password);
    if (!authorized) throw error;

    const token = createAuthToken({ id: user.id }) as string;

    log.complete('authenticated user with email', data.email);

    return {
      token,
      user,
    };
  }

  async create(data: CreateUserInput, lang: AppI18nLang) {
    log.start('creating user with email');

    if (await this.getByEmail(data.email)) throw getErrorMessage(727, lang);

    const password = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password, id: nanoid() });

    log.complete('user created with email', data.email);

    const token = createAuthToken({ id: user.id });

    return { user: gqlModelTransform<User>(user), token };
  }

  async getByEmail(email: string) {
    const user = await UserModel.findOne({ email });

    if (user) return gqlModelTransform<User>(user);

    return;
  }
}
