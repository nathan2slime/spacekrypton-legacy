import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($login: LoginInput!) {
    Login(login: $login) {
      token
      user {
        email
        id
        roles
        satellites
        thumb
        updated_at
        username
        deleted_at
        avatar
        created_at
      }
    }
  }
`;

export const signupMutation = gql`
  mutation SignUp($user: CreateUserInput!) {
    SignUp(user: $user) {
      token
      user {
        username
        email
        roles
        id
        satellites
        thumb
        updated_at
        deleted_at
        created_at
        avatar
      }
    }
  }
`;
