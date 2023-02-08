import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { AuthState } from '../../types/auth.types';
import { setAuthAction, setUserAction } from '../actions/auth.actions';

import avatar from '../../assets/images/avatar.jpg';

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
    });
});
