import { useEffect, useState } from 'react';
import { KryLoading, KryTrack } from '@kry/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { langs } from '@kry/i18n';
import { NextPage } from 'next';
import { dark } from '@kry/themes';
import envs from '@kry/envs';

import { AppState, useTypedDispatch } from '../../store';
import { UserLocation } from '@/types/satellites.types';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/funcs';
import { Satellite } from '@kry/api/src/graphql/schemas/satellites.schemas';
import {
  getAltitudeService,
  trackSatelliteService,
} from '@/services/satellites.services';
import { favoriteSatelliteThunk } from '@/store/thunks/auth.thunks';
import { favoriteSatelliteAction } from '@/store/actions/auth.actions';

const Track: NextPage = () => {
  const [location, setLocation] = useState<UserLocation>();
  const [satellite, setSatellite] = useState<Satellite>();
  const [isReTrack, setIsReTrack] = useState(false);
  const [id, setID] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const [loadingMessage, setLoadingMessage] = useState<string>();

  const {
    lang,
    auth: { user },
  } = useSelector((state: AppState) => state);

  const router = useRouter();
  const dispatch = useTypedDispatch();

  const i18n = langs['en'].web.satellites;

  const onGetAltitude = async (e: GeolocationPosition | false) => {
    const id = router.query.id;
    if (e && id) {
      const ID = parseInt(id as string);

      if (!Number.isFinite(ID)) return router.push('/');

      setID(ID);

      const { latitude, longitude } = e.coords;
      const altitude = parseInt(getLocalStorageItem(envs.localStorageKeys.altitude));

      if (Number.isFinite(altitude))
        return onTrackSatellite({ altitude, longitude, latitude }, ID);

      const { data } = await getAltitudeService({ latitude, longitude });

      if (data) {
        const elevation = data.GetAltitude.elevation;
        setLocalStorageItem(envs.localStorageKeys.altitude, elevation.toString());

        onTrackSatellite({ altitude: elevation, longitude, latitude }, ID);
      } else {
        setLoading(false);
      }
    }

    return;
  };

  const onTrackSatellite = async (location: UserLocation, id: number) => {
    setLocation(location);

    const { data } = await trackSatelliteService({
      ...location,
      seconds: 300,
      id,
    });

    if (data) {
      setSatellite(data.TrackSatellite);

      setLoading(false);
    } else {
      if (!isReTrack) router.push('/');
    }
  };

  const onRequestTrack = () => {
    if (location && id) {
      setIsReTrack(true);
      onTrackSatellite(location, id);
    }
  };

  const onFavoriteSatellite = async () => {
    if (user) {
      id && dispatch(favoriteSatelliteAction(id));
      dispatch(favoriteSatelliteThunk());
    } else {
      router.push('/auth/login');
    }
  };

  useEffect(() => {
    setLoadingMessage(i18n.singleTracking);
  }, []);

  return (
    <KryTrack
      satellite={satellite}
      onKryRequestTrack={() => onRequestTrack()}
      onKryLocation={e => onGetAltitude(e.detail)}
      favorite={user && user.satellites.includes(id)}
      language={lang}
      onKryFallback={() => router.push('/')}
      onKryFavoriteSatellite={() => onFavoriteSatellite()}
      loading={isReTrack ? false : loading}
    >
      <KryLoading message={loadingMessage}>
        <BallTriangle height="40px" width="40px" color={dark.loadingColorUp} visible />
      </KryLoading>
    </KryTrack>
  );
};

export default Track;
