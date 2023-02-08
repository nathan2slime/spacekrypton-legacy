import { createAction } from '@reduxjs/toolkit';

import { AuthState, UserType } from '../../types/auth.types';

export const setAuthAction = createAction<AuthState, string>('setAuth');
export const setUserAction = createAction<UserType, string>('setUser');
