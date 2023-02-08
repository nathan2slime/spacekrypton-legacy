/* eslint-disable no-unused-vars */
import { ResolverData } from 'type-graphql';
import { AppI18nLang } from '@kry/i18n';

import { decodedAuthToken } from '../utils/token';

import { UserServices } from '../services/users.services';
import { User } from '../graphql/schemas/users.schemas';

export type AppContext = {
  user: number;
  lang: AppI18nLang;
};

type UserDecoded = {
  id: number;
};

const userServices: UserServices = new UserServices();

export const authChecker: (
  data: ResolverData<AppContext>,
  roles: string[]
) => Promise<boolean> = async (data, roles) => {
  const id = data.context.user;

  if (id) {
    const user: User = await userServices.getById(id, 'en');

    if (!user) return false;

    const userRoles = user.roles.filter(role => roles.includes(role));

    return userRoles.length == roles.length;
  }

  return false;
};

export const getUserIDByToken = async (token?: string) => {
  const data = decodedAuthToken(token || '') as UserDecoded;

  return data?.id;
};
