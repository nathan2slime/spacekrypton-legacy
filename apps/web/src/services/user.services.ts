import graphql from '@/graphql';
import { getProfileQuery } from '@/graphql/queries/user.queries';
import { GetProfilePayload, GetProfileResponse } from '@/types/user.types';

export const getProfileService = async (id: string, ssr: boolean) =>
  await graphql<GetProfileResponse, GetProfilePayload>({
    query: getProfileQuery,
    type: 'query',
    variables: {
      data: id,
    },
    notify: false,
    ssr,
  });
