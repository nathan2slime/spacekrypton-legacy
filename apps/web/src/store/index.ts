import { configureStore, combineReducers, Store } from '@reduxjs/toolkit';
import { KryAlert } from '@kry/core/dist/types/utils/types';
import { createWrapper } from 'next-redux-wrapper';
import { Themes } from '@kry/themes';
import { AppI18nLang } from '@kry/i18n';

import { AuthState } from '@/types/auth.types';

import themeReducer from './reducers/theme.reducers';
import langReducer from './reducers/lang.reducers';
import authReducers from './reducers/auth.reducers';
import alertReducers from './reducers/alert.reducers';

export type AppState = {
  theme: Themes;
  lang: AppI18nLang;
  auth: AuthState;
  alert: KryAlert;
};

const reducer = combineReducers<AppState>({
  theme: themeReducer,
  auth: authReducers,
  lang: langReducer,
  alert: alertReducers,
});

const makeStore = () =>
  configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

export const wrapper = createWrapper<Store<AppState>>(makeStore, {
  debug: false,
});
