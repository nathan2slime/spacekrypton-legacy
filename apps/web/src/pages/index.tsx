import Head from 'next/head';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { KryLoading, KrySatellites, KryToggleEarth } from '@kry/react';
import { BallTriangle, MutatingDots } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { themes } from '@kry/themes';
import envs from '@kry/envs';

import { getLocalStorageItem, setLocalStorageItem } from '@/utils/funcs';
import {
  getAltitudeService,
  searchSatellitesService,
} from '@/services/satellites.services';
import {
  FilterSatellite,
  SatelliteOrder,
  SatelliteSort,
  UserLocation,
} from '@/types/satellites.types';
import { AppState } from '@/store';
import { setAlertAction } from '@/store/actions/alert.actions';
import { langs } from '@kry/i18n';
import {
  setLoading3DSatellitesViewAction,
  setSatellitesAction,
  setSatellitesViewAction,
  setUserLocationAction,
} from '@/store/actions/satellites.actions';

import background from '@/assets/images/auth_background.png';

const Satellites: NextPage<any> = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const {
    lang,
    satellites: { data: satellites, location, loading3d, view },
  } = useSelector((state: AppState) => state);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterSatellite>();

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
    const initial = e && !location && satellites.length == 0;

    if (initial) {
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
    dispatch(setUserLocationAction({ altitude, longitude, latitude }));

    const payload = {
      latitude,
      longitude,
      altitude,
      search,
      order: 'DESC' as SatelliteOrder,
      sort: (currentFilter || filter[0]).key.toLocaleUpperCase() as SatelliteSort,
    };

    setMessageLoading(i18n.tracking);

    const { data } = await searchSatellitesService(payload);

    setLoading(false);

    if (data) {
      dispatch(setSatellitesAction(data.SearchSatellite));
      dispatch(setLoading3DSatellitesViewAction(true));
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
        dispatch(setSatellitesAction([]));
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
      type={view}
      loading3D={loading3d}
      satellites={satellites}
      search={search}
      favorites={[]}
      language={lang}
      pathname={pathname}
      onKryChangeSearch={e => setSearch(e.detail)}
      onKryLocation={e => onGetAltitude(e.detail)}
      onKryFilter={e => setCurrentFilter(e.detail)}
      onKrySearch={() => onStartSearch()}
      onKryToggleLoading3D={e => dispatch(setLoading3DSatellitesViewAction(e.detail))}
      onKryFallback={() => push('/')}
      onKryTrackSatellite={e => push('/satellites/' + e.detail)}
    >
      <Head>
        <title>{langs[lang].web.satellites.title} | Space Krypton</title>
      </Head>

      {loading && (
        <KryLoading slot="loading" message={messageLoading}>
          <BallTriangle
            height="40px"
            visible
            width="40px"
            color={themes.dark.loadingColorUp}
          />
        </KryLoading>
      )}

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

      <KryToggleEarth
        slot="toggle"
        view3dIcon="/assets/icons/earth.svg"
        viewMapIcon="/assets/icons/map.svg"
        viewMapLabel="2D"
        background={background.src}
        view3dlabel="3D"
        label={i18n.toggleView}
        onKryToggleViewEarth={e => dispatch(setSatellitesViewAction(e.detail))}
      />
    </KrySatellites>
  );
};

export default Satellites;
