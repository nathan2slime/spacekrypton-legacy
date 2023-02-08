import { CreateUserInput, LoginInput } from '@kry/api/src/graphql/schemas/users.schemas';

export type UserType = {
  id?: string;
  email?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  satellites?: number[];
  thumb?: string;
  roles?: string[];
  username?: string;
};

export type AuthState = {
  logged: boolean;
  user?: UserType;
  token?: string;
};

export type UserReponse = {
  user: UserType;
  token: string;
};

export type SignupResponse<T> = {
  SignUp: T;
};

export type LoginResponse<T> = {
  Login: T;
};

export type AuthReponse<T> = {
  Auth: T;
};

export type CreateUserPayload = {
  user: CreateUserInput;
};

export type LoginPayload = {
  login: LoginInput;
};
