import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';

import { AuthUser, CreateUserInput, LoginInput, User } from '../schemas/users.schemas';
import { UserServices } from '../../services/users.services';
import type { AppContext } from '../../auth';

@Resolver()
export class UserResolver {
  userServices: UserServices = new UserServices();

  @Query(() => User)
  async Auth(@Ctx() ctx: AppContext): Promise<User> {
    return await this.userServices.getById(ctx.user, ctx.lang);
  }

  @Mutation(() => AuthUser)
  async Login(@Arg('login') data: LoginInput, @Ctx() ctx: AppContext): Promise<AuthUser> {
    return await this.userServices.login(data, ctx.lang);
  }

  @Mutation(() => AuthUser)
  async SignUp(
    @Arg('user') data: CreateUserInput,
    @Ctx() ctx: AppContext
  ): Promise<AuthUser> {
    return await this.userServices.create(data, ctx.lang);
  }
}
