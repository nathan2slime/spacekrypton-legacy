import { gql } from '@apollo/client';

export const getAltitudeQuery = gql`
  query GetAltitude($data: AltitudeInput!) {
    GetAltitude(data: $data) {
      elevation
    }
  }
`;

export const searchSatellitesQuery = gql`
  query SearchSatellite($data: SearchSatelliteInput!) {
    SearchSatellite(data: $data) {
      id
      name
      positions {
        altitude
        latitude
        longitude
        azimuth
        elevation
        ra
        dec
        timestamp
        eclipsed
      }
    }
  }
`;

export const trackSatelliteQuery = gql`
  query SatellitePosition($data: SatellitePositionInput!) {
    TrackSatellite(data: $data) {
      positions {
        elevation
        altitude
        dec
        eclipsed
        azimuth
        latitude
        ra
        timestamp
        longitude
      }

      name
      id
    }
  }
`;
