import { FC } from 'react';
import { AppProps } from 'next/app';
import { useDispatch, useSelector } from 'react-redux';
import { KryApp } from '@kry/react';
import { themes } from '@kry/themes';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ThemeProvider } from 'styled-components';

import { withAppState } from '@/components/guards/state';
import { setAlertAction } from '@/store/actions/alert.actions';
import { setAuthAction } from '@/store/actions/auth.actions';
import { AuthProvider } from '@/components/providers/auth';
import { AppState } from '@/store';

import GlobalStyle, { Fonts } from '@/global';
import { seo } from '@/config';

import 'remixicon/fonts/remixicon.css';

const pages = ['login', 'signup'];

const App: FC<AppProps> = ({ Component, ...props }) => {
  const {
    auth: { user, logged },
    ...state
  } = useSelector((state: AppState) => state);
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();

  const theme = themes[state.theme];
  const hide = !pages.find(page => pathname.includes(page));

  const onLogout = () => {
    dispatch(setAuthAction({ user: undefined, token: undefined, logged: false }));

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <KryApp
          user={user}
          hide={hide}
          alert={state.alert}
          language={state.lang}
          pathname={pathname}
          logged={logged}
          onKryAlert={e => dispatch(setAlertAction({ ...state.alert, ...e.detail }))}
          onKryRedirect={e => push(e.detail)}
          onKryLogoutApp={() => onLogout()}
        >
          <Component {...props} />
        </KryApp>
      </AuthProvider>

      <NextSeo {...seo} />
      <Fonts />

      <GlobalStyle />
    </ThemeProvider>
  );
};

export default withAppState(App);
