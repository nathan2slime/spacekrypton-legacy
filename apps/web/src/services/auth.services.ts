import graphql from '@/graphql';
import { loginMutation, signupMutation } from '@/graphql/mutations/auth.mutations';
import { CreateUserInput, LoginInput } from '@kry/api/src/graphql/schemas/users.schemas';
import {
  AuthReponse,
  CreateUserPayload,
  LoginPayload,
  LoginResponse,
  SignupResponse,
  UserReponse,
  UserType,
} from '@/types/auth.types';
import { authQuery } from '@/graphql/queries/auth.queries';

export const loginService = async (data: LoginInput) =>
  await graphql<LoginResponse<UserReponse>, LoginPayload>({
    query: loginMutation,
    type: 'mutation',
    variables: {
      login: data,
    },
  });

export const signupService = async (data: CreateUserInput) =>
  await graphql<SignupResponse<UserReponse>, CreateUserPayload>({
    query: signupMutation,
    type: 'mutation',
    variables: {
      user: data,
    },
  });

export const authService = async () =>
  await graphql<AuthReponse<UserType>, object>({
    query: authQuery,
    type: 'query',
    variables: {},
    notify: false,
  });
