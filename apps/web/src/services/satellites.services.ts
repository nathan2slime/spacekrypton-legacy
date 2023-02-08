import graphql from '@/graphql';
import {
  getAltitudeQuery,
  searchSatellitesQuery,
} from '@/graphql/queries/satellites.queries';
import {
  GetAltitudePayload,
  GetAltitudeResponse,
  SearchSatellitePayload,
  SearchSatelliteResponse,
} from '@/types/satellites.types';
import {
  AltitudeInput,
  SearchSatelliteInput,
} from '@kry/api/src/graphql/schemas/satellites.schemas';

export const getAltitudeService = (data: AltitudeInput) =>
  graphql<GetAltitudeResponse, GetAltitudePayload>({
    query: getAltitudeQuery,
    type: 'query',
    variables: {
      data,
    },
  });

export const searchSatellitesService = (data: SearchSatelliteInput) =>
  graphql<SearchSatelliteResponse, SearchSatellitePayload>({
    query: searchSatellitesQuery,
    type: 'query',
    variables: {
      data,
    },
  });
