export type AppI18nLang = 'en' | 'pt-BR';

export type AppI18nErr = {
  userNotFound: string;
  emailAlredyExists: string;
  isNotAuthenticated: string;
  invalidCredentials: string;
  languageNotAvailable: string;
  errorUnknow: string;
  notAuthorized: string;
  timeoutError: string;
  unableSearchSatellites: string;
  noSatellitesFound: string;
  unableGetAltitude: string;
  unableTrackSatellite: string;
};

export type WebI18n = {
  form: {
    email: string;
    password: string;
    required: string;
    search: string;
    limit: (value: number) => string;
    invalidEmail: string;
    username: string;
  };
  satellites: {
    title: string;
    latitude: string;
    longitude: string;
    altitude: string;
    name: string;
    searching: string;
    period: string;
    eccentricity: string;
    inclination: string;
    you: string;
    singleTracking: string;
    toggleView: string;
    offline: string;
    azimuth: string;
    declination: string;
    rightAscension: string;
    elevation: string;
    timestamp: string;
    eclipsed: string;
    getAltitude: string;
    tracking: string;
    loading3d: string;
    results: string;
    track: string;
  };
  yes: string;
  no: string;
  sidebar: {
    logout: string;
    profile: string;
    index: string;
    login: string;
    signup: string;
    satellites: string;
    news: string;
  };
  auth: {
    alreadyHaveAccount: string;
    noHaveAccount: string;
  };
};

export type AppI18n = {
  web: WebI18n;
  err: AppI18nErr;
};
