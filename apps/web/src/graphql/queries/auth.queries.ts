import { gql } from '@apollo/client';

export const authQuery = gql`
  query Auth {
    Auth {
      username
      email
      created_at
      updated_at
      deleted_at
      id
      avatar
      roles
      satellites
      thumb
    }
  }
`;
