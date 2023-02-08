export type ResponseOpenTopElevation = {
  results: {
    elevation: number;
  }[];
};

export type ResponseGpxzElevation = {
  result: {
    elevation: number;
  };
};

export type ResponseTrackingSatellite = {
  info: {
    satid: number;
    satname: string;
  };
  positions: {
    satlatitude: number;
    ra: number;
    satlongitude: number;
    sataltitude: number;
    azimuth: number;
    elevation: number;
    dec: number;
    timestamp: number;
    eclipsed: boolean;
    radius: number;
  }[];
};

export type ResponseSearchSatellites = {
  member: {
    name: string;
    satelliteId: number;
  }[];
};
