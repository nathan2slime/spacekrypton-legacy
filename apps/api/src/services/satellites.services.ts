import envs from '@kry/envs';
import { AppI18nLang } from '@kry/i18n';
import axios from 'axios';

import { getErrorMessage } from '../graphql/errors';
import {
  Altitude,
  AltitudeInput,
  Satellite,
  SatellitePositionInput,
  SearchSatelliteInput,
} from '../graphql/schemas/satellites.schemas';
import {
  ResponseGpxzElevation,
  ResponseOpenTopElevation,
  ResponseSearchSatellites,
  ResponseTrackingSatellite,
} from '../graphql/types/satellites.types';
import { log } from '../log';

export class SatellitesServices {
  async positions(
    payload: SatellitePositionInput,
    lang: AppI18nLang
  ): Promise<Satellite> {
    const { altitude, id, latitude, longitude, seconds } = payload;
    log.start('getting satellite positions', payload);

    const err = getErrorMessage(123, lang);

    const { data, status } = await axios.get<ResponseTrackingSatellite>(
      `/positions/${id}/${latitude}/${longitude}/${altitude}/${seconds}&apiKey=${envs.api.key.satelliteData[0]}`,
      {
        baseURL: envs.api.url.satelliteTracking,
      }
    );

    if (!data.info.satname) throw err;

    if (status == 200) {
      log.success('satellites was tracked', data.info.satid);

      return {
        id: data.info.satid,
        name: data.info.satname,
        positions: data.positions.map(position => ({
          ...position,
          altitude: position.sataltitude,
          latitude: position.satlatitude,
          longitude: position.satlongitude,
        })),
      };
    }

    throw err;
  }

  async getAltitude(data: AltitudeInput, lang: AppI18nLang): Promise<Altitude> {
    const { latitude, longitude } = data;
    log.start('getting altitude to', data);

    const resOpenTopUrl = await axios.get<ResponseOpenTopElevation>(
      `${envs.api.url.getAltitude}?locations=${latitude},${longitude}`
    );

    if (resOpenTopUrl.status == 200) {
      const elevation = resOpenTopUrl.data.results[0].elevation;

      log.success('altitude was obtained', elevation);

      return {
        elevation,
      };
    }

    const resGpxz = await axios.get<ResponseGpxzElevation>(
      `${envs.api.url.getElevation}/point?lat=${latitude}&lon=${longitude}`,
      {
        headers: { 'x-api-key': envs.api.key.getElevation },
      }
    );

    if (resGpxz.status == 200) {
      const elevation = resGpxz.data.result.elevation;
      log.success('altitude was obtained', elevation);

      return { elevation };
    }

    throw getErrorMessage(123, lang);
  }

  async search(payload: SearchSatelliteInput, lang: AppI18nLang) {
    const { search, order, sort, altitude, latitude, longitude } = payload;
    log.start('starting search with', payload);

    const {
      data: { member },
      status,
    } = await axios.get<ResponseSearchSatellites>(
      `${envs.api.url.satelliteData}?search=${search}&?sort=${sort}&?sort-dir=${order}`
    );

    if (status != 200) throw getErrorMessage(115, lang);
    if (member.length == 0) throw getErrorMessage(114, lang);

    const data = await Promise.allSettled(
      member.slice(0, 8).map(async sat =>
        this.positions(
          {
            altitude,
            latitude,
            longitude,
            id: sat.satelliteId,
            seconds: 1,
          },
          lang
        )
      )
    );

    const res = data.filter(e => e.status === 'fulfilled').map((f: any) => f.value);
    log.success(`search performed with ${res.length} results`);

    return res;
  }
}
