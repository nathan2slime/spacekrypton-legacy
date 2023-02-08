import Head from 'next/head';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { KryLoading, KrySatellites } from '@kry/react';
import { BallTriangle, MutatingDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { themes } from '@kry/themes';
import envs from '@kry/envs';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/funcs';
import {
  getAltitudeService,
  searchSatellitesService,
} from '@/services/satellites.services';
import { Satellite } from '@kry/api/src/graphql/schemas/satellites.schemas';
import {
  FilterSatellite,
  SatelliteOrder,
  SatelliteSort,
  UserLocation,
} from '@/types/satellites.types';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { setAlertAction } from '@/store/actions/alert.actions';
import { langs } from '@kry/i18n';

const Satellites: NextPage<any> = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const { lang } = useSelector((state: AppState) => state);

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState<UserLocation>();
  const [loading, setLoading] = useState(true);
  const [messageLoading, setMessageLoading] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterSatellite>();
  const [satellites, setSatellites] = useState<Satellite[]>([]);

  const i18n = langs[lang].web.satellites;
  const filter: FilterSatellite[] = [
    {
      title: i18n.name,
      key: 'name',
      icon: 'ri-profile-line',
    },
    {
      title: i18n.period,
      key: 'period',
      icon: 'ri-time-line',
    },
    {
      title: i18n.eccentricity,
      icon: 'ri-checkbox-blank-circle-line',
      key: 'eccentricity',
    },
    {
      title: i18n.inclination,
      icon: 'ri-ruler-line',
      key: 'inclination',
    },
  ];

  const onGetAltitude = async (e: GeolocationPosition | false) => {
    if (e) {
      setLoading(true);

      const { latitude, longitude } = e.coords;
      const altitude = parseInt(getLocalStorageItem(envs.localStorageKeys.altitude));

      if (Number.isFinite(altitude))
        return onSearchSatellites({ altitude, longitude, latitude });

      const { data } = await getAltitudeService({ latitude, longitude });

      if (data) {
        const elevation = data.GetAltitude.elevation;
        setLocalStorageItem(envs.localStorageKeys.altitude, elevation.toString());

        onSearchSatellites({ altitude: elevation, longitude, latitude });
      } else {
        setLoading(false);
      }
    }

    return;
  };

  const onSearchSatellites = async ({ altitude, longitude, latitude }: UserLocation) => {
    setLocation({ altitude, longitude, latitude });

    const payload = {
      latitude,
      longitude,
      altitude,
      search,
      order: 'DESC' as SatelliteOrder,
      sort: currentFilter?.key.toLocaleUpperCase() as SatelliteSort,
    };

    setMessageLoading(i18n.tracking);

    const { data } = await searchSatellitesService(payload);

    setLoading(false);

    if (data) {
      setSatellites(data.SearchSatellite);
      return data.SearchSatellite;
    }

    return;
  };

  const onStartSearch = async () => {
    if (location) {
      setLoading(true);
      setMessageLoading('Looking for satellites');
      const data = await onSearchSatellites(location);

      if (data) {
        dispatch(
          setAlertAction({
            open: true,
            title: data.length + i18n.results,
            color: 'secondary',
          })
        );
      } else {
        setSatellites([]);
      }
    }
  };

  useEffect(() => {
    setMessageLoading(i18n.getAltitude);
    setCurrentFilter(filter[0]);
  }, []);

  return (
    <KrySatellites
      filter={filter}
      loading={loading}
      currentFilter={currentFilter}
      satellites={satellites}
      type="3D"
      search={search}
      favorites={[]}
      language={lang}
      pathname={pathname}
      onKryChangeSearch={e => setSearch(e.detail)}
      onKryLocation={e => onGetAltitude(e.detail)}
      onKryFilter={e => setCurrentFilter(e.detail)}
      onKrySearch={() => onStartSearch()}
      onKryFallback={() => push('/')}
      onKryTrackSatellite={e => push('/satellites/' + e.detail)}
    >
      <Head>
        <title>{langs[lang].web.satellites.title} | Space Krypton</title>
      </Head>

      <KryLoading slot="loading" message={messageLoading}>
        <BallTriangle
          height="40px"
          visible
          width="40px"
          color={themes.dark.loadingColorUp}
        />
      </KryLoading>

      <div slot="3d">
        <MutatingDots
          height="100px"
          width="100px"
          color={themes.dark.loadingColorUp}
          secondaryColor={themes.dark.loadingColorUp}
          radius="10"
          visible
        />
      </div>
    </KrySatellites>
  );
};

export default Satellites;
