import { createAction } from '@reduxjs/toolkit';
import { KryAlert } from '@kry/core/dist/types/utils/types';

export const setAlertAction = createAction<KryAlert, string>('setAlert');
