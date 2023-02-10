import { AppI18nLang, langs } from '@kry/i18n';

import { AppError } from './types';

export const getAppErrors = (lang: AppI18nLang = 'en'): AppError => {
  const err = langs[lang].err;

  return {
    721: err.userNotFound,
    727: err.emailAlredyExists,
    726: err.errorUnknow,
    725: err.invalidCredentials,
    724: err.isNotAuthenticated,
    112: err.languageNotAvailable,
    113: err.unableGetAltitude,
    114: err.noSatellitesFound,
    115: err.unableSearchSatellites,
    111: err.notAuthorized,
    123: err.unableTrackSatellite,
    116: err.timeoutError,
  };
};
