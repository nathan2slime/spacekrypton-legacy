import { createAction } from '@reduxjs/toolkit';

import { Satellite } from '@kry/api/src/graphql/schemas/satellites.schemas';
import { SatellitesView, UserLocation } from '@/types/satellites.types';

export const setSatellitesAction = createAction<Satellite[], string>('setSatellites');
export const setUserLocationAction = createAction<UserLocation, string>(
  'setUserLocation'
);

export const setSatellitesViewAction = createAction<SatellitesView, string>(
  'setViewAction'
);

export const setLoading3DSatellitesViewAction = createAction<boolean, string>(
  'setLoading3DSatellitesView'
);
