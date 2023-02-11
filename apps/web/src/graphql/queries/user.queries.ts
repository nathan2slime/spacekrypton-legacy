import { gql } from '@apollo/client';

export const getProfileQuery = gql`
  query Profile($data: String!) {
    Profile(id: $data) {
      avatar
      created_at
      deleted_at
      id
      username
      updated_at
      thumb
      email
      roles
      satellites
    }
  }
`;
