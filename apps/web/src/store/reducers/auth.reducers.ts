import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { AuthState } from '../../types/auth.types';
import {
  favoriteSatelliteAction,
  setAuthAction,
  setFavoriteUserSatellitesAction,
  setUserAction,
} from '../actions/auth.actions';

import avatar from '../../assets/images/avatar.jpg';
import { string } from 'yup/lib/locale';

const INITIAL: AuthState = {
  logged: false,
};

export default createReducer(INITIAL, builder => {
  builder
    .addCase<string, AnyAction>(setAuthAction.type, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase<string, AnyAction>(setUserAction.type, (state, action) => {
      const payload = action.payload;

      return {
        ...state,
        user: {
          ...payload,
          avatar: payload.avatar ? payload.avatar : avatar.src,
        },
      };
    })
    .addCase<string, AnyAction>(setFavoriteUserSatellitesAction.type, (state, action) => {
      const user = state.user;

      if (user) return { ...state, user: { ...user, satellites: action.payload } };

      return state;
    })
    .addCase<string, AnyAction>(favoriteSatelliteAction.type, (state, action) => {
      const user = state.user;
      const newSat = action.payload;

      if (user) {
        let satellites = [...user.satellites];

        if (satellites) {
          const index = satellites.indexOf(newSat);

          if (index === -1) {
            satellites = [...satellites, newSat];
          } else {
            satellites = satellites.filter(sat => sat != newSat);
          }

          return { ...state, user: { ...user, satellites } };
        }
      }

      return state;
    });
});
