import { createAction } from '@reduxjs/toolkit';

import { AuthState, UserType } from '../../types/auth.types';

export const setAuthAction = createAction<AuthState, string>('setAuth');
export const setUserAction = createAction<UserType, string>('setUser');
export const favoriteSatelliteAction = createAction<number, string>(
  'favoriteSatelliteAction'
);
export const setFavoriteUserSatellitesAction = createAction<number[], string>(
  'setFavoriteUserSatellites'
);
