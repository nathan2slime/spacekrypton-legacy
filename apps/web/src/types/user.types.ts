import { User } from '@kry/api/src/graphql/schemas/users.schemas';

export type GetProfilePayload = {
  data: string;
};

export type GetProfileResponse = {
  Profile: User;
};
