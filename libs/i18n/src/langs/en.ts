import { AppI18n } from '../types';

export const en: AppI18n = {
  err: {
    userNotFound: 'User not found',
    emailAlredyExists: 'Email alredy exists',
    isNotAuthenticated: 'Is not authenticated',
    invalidCredentials: 'Invalid credentials',
    errorUnknow: 'Error unknow',
    unableGetAltitude: 'Unable to get altitude',
    languageNotAvailable: 'Language not available',
    notAuthorized: 'Not authorized',
    unableSearchSatellites: 'Unable to search for satellites',
    noSatellitesFound: 'No satellites found',
    timeoutError: 'Timeout, try again',
    unableTrackSatellite: 'Unable to track this satellite',
  },
  web: {
    form: {
      email: 'Email',
      password: 'Password',
      search: 'Search',
      username: 'Username',
    },
    sidebar: {
      logout: 'Logout',
      news: 'News',
      signup: 'Signup',
      login: 'Login',
      profile: 'Profile',
      satellites: 'Satellites',
    },
    yes: 'Yes',
    no: 'No',
    satellites: {
      altitude: 'Altitude',
      azimuth: 'Azimuth',
      latitude: 'Latitude',
      eclipsed: 'Eclipsed',
      inclination: 'Inclination',
      you: 'You',
      toggleView: 'Choose interaction mode',
      declination: 'Declination',
      rightAscension: 'Right Ascension',
      elevation: 'Elevation',
      timestamp: 'Timestamp',
      longitude: 'Longitude',
      name: 'Name',
      period: 'Period',
      title: 'Satellites',
      offline: 'Offline',
      getAltitude: 'Getting your altitude',
      tracking: 'Tracking satellites',
      searching: 'Looking for satellites',
      track: 'Track',
      results: ' satellites tracked',
      loading3d: 'Loading 3D experience',
      eccentricity: 'Eccentricity',
    },
    auth: {
      alreadyHaveAccount: 'Already have an account?',
      noHaveAccount: "Don't have an account?",
    },
  },
};
