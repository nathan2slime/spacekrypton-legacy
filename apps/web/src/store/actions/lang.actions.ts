import { AppI18nLang } from '@kry/i18n';
import { createAction } from '@reduxjs/toolkit';

export const setLangAction = createAction<AppI18nLang, string>('setLang');
