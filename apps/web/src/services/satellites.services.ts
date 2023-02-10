import graphql from '@/graphql';
import {
  getAltitudeQuery,
  searchSatellitesQuery,
  trackSatelliteQuery,
} from '@/graphql/queries/satellites.queries';
import {
  GetAltitudePayload,
  GetAltitudeResponse,
  SearchSatellitePayload,
  SearchSatelliteResponse,
  TrackSatellitePayload,
  TrackSatelliteResponse,
} from '@/types/satellites.types';
import {
  AltitudeInput,
  SatellitePositionInput,
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

export const trackSatelliteService = (data: SatellitePositionInput) =>
  graphql<TrackSatelliteResponse, TrackSatellitePayload>({
    query: trackSatelliteQuery,
    type: 'query',
    variables: {
      data,
    },
  });
