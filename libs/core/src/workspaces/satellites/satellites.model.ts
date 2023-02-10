export type SatellitePosition = {
  latitude: number;
  longitude: number;
  altitude: number;
  azimuth: number;
  elevation: number;
  ra: number;
  dec: number;
  timestamp: number;
  eclipsed: boolean;
};

export type Satellite = {
  id: number;
  name: string;
  positions: SatellitePosition[];
};

export type FilterSatellites = {
  title: string;
  key: string;
  icon: string;
};

export type FavoriteSatelliteDetail = {
  id: number;
  favorite: boolean;
};

export type GlobalSatellite = {
  coords: GlobalCoords[];
};

export type GlobalCoords = {
  coords: {
    lat: number;
    long: number;
  }[];
};
