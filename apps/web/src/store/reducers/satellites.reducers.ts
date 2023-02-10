import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { SatelliteState } from '@/types/satellites.types';
import {
  setLoading3DSatellitesViewAction,
  setSatellitesAction,
  setSatellitesViewAction,
  setUserLocationAction,
} from '../actions/satellites.actions';

const INITIAL: SatelliteState = {
  data: [],
  loading3d: false,
};

export default createReducer<SatelliteState>(INITIAL, builder => {
  builder
    .addCase<string, AnyAction>(setSatellitesAction.type, (state, action) => ({
      ...state,
      data: action.payload,
    }))
    .addCase<string, AnyAction>(setUserLocationAction.type, (state, action) => ({
      ...state,
      location: action.payload,
    }))
    .addCase<string, AnyAction>(
      setLoading3DSatellitesViewAction.type,
      (state, action) => ({
        ...state,
        loading3d: action.payload,
      })
    )
    .addCase<string, AnyAction>(setSatellitesViewAction.type, (state, action) => ({
      ...state,
      view: action.payload,
    }));
});
