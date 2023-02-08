import { AnyAction, createReducer } from '@reduxjs/toolkit';

import { KryAlert } from '@kry/core/dist/types/utils/types';

import { setAlertAction } from '../actions/alert.actions';

const INITIAL: KryAlert = {
  color: 'primary',
  open: false,
};

export default createReducer(INITIAL, builder => {
  builder.addCase<string, AnyAction>(setAlertAction.type, (state, action) => ({
    ...state,
    ...action.payload,
  }));
});
