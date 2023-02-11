import { Dispatch } from '@reduxjs/toolkit';
import { AppState } from '@/store';
import { favoriteSatelliteService } from '@/services/auth.services';

import { setFavoriteUserSatellitesAction } from '../actions/auth.actions';

export const favoriteSatelliteThunk = () => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    const user = getState().auth.user;

    if (user) {
      const satellites = user.satellites;

      const { data } = await favoriteSatelliteService({ satellites });

      if (data && data.UpdateUser)
        dispatch(setFavoriteUserSatellitesAction(data.UpdateUser.satellites));
    }
  };
};
