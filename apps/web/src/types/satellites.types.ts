import {
  Altitude,
  AltitudeInput,
  Satellite,
  SearchSatelliteInput,
} from '@kry/api/src/graphql/schemas/satellites.schemas';

export enum SatelliteSort {
  ID = 'id',
  NAME = 'name',
  POPULARITY = 'popularity',
  INCLINATION = 'inclination',
  ECCENTRICITY = 'eccentricity',
  PERIOD = 'period',
}

export enum SatelliteOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export type GetAltitudeResponse = {
  GetAltitude: Altitude;
};

export type GetAltitudePayload = {
  data: AltitudeInput;
};

export type SearchSatellitePayload = {
  data: SearchSatelliteInput;
};

export type SearchSatelliteResponse = {
  SearchSatellite: Satellite[];
};

export type UserLocation = {
  altitude: number;
  longitude: number;
  latitude: number;
};

export type FilterSatellite = {
  title: string;
  icon: string;
  key: string;
};

export type SatellitesView = '2D' | '3D';

export type SatelliteState = {
  data: Satellite[];
  location?: UserLocation;
  view?: SatellitesView;
  loading3d: boolean;
};
