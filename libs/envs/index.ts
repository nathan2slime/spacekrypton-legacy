export default {
  localStorageKeys: {
    lang: process.env.NEXT_PUBLIC_LANG_KEY_LOCAL_STORAGE || 'lang',
    altitude: process.env.NEXT_PUBLIC_ALTITUDE_KEY_LOCAL_STORAGE || 'altitude',
    token: process.env.NEXT_PUBLIC_TOKEN_KEY_LOCAL_STORAGE || 'token',
  },
  token: {
    key: process.env.TOKEN_KEY || 'Bearer',
    hash: process.env.TOKEN_HASH || Math.random().toString(),
  },
  api: {
    key: {
      satelliteData: [
        process.env.SATELLITE_DATA_API_KEY_ONE,
        process.env.SATELLITE_DATA_API_KEY_TWO,
      ] as string[],
      getElevation: process.env.GPXZ_API_KEY as string,
    },
    url: {
      satelliteTracking:
        process.env.SATELLITE_TRACKING_API_URL ||
        'https://api.n2yo.com/rest/v1/satellite',
      satelliteData:
        process.env.SATELLITE_DATA_API_URL || 'https://tle.ivanstanojevic.me/api/tle',
      getElevation: process.env.GPXZ_API_URL || 'https://api.gpxz.io/v1/elevation',
      getAltitude:
        process.env.OPEN_TOP_API_URL || 'https://api.opentopodata.org/v1/test-dataset',
    },
  },
  database: process.env.DB_URL || 'mongodb://localhost:27017',
};
