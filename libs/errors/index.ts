import { AppI18nLang } from '@kry/i18n';

import { ErrorCode } from '@/types';
import { getAppErrors } from './src';

export * from '@/types';

export const appError = (code: ErrorCode, lang: AppI18nLang = 'en') =>
  getAppErrors(lang)[code];
