import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppI18nLang } from '@kry/i18n';

import Loading from '@/components/loading';
import { authService } from '@/services/auth.services';

import { AuthProviderProps } from './model';
import { setAuthAction, setUserAction } from '@/store/actions/auth.actions';
import { setLangAction } from '@/store/actions/lang.actions';
import { getLocalStorageItem } from '@/utils/funcs';

export const AuthProvider: FC<AuthProviderProps> = props => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getSavedUser = () => {
    const user = localStorage.getItem('user');

    if (user) return JSON.parse(user);
  };

  const stopLoading = () => setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    const user = getSavedUser();
    const token = getLocalStorageItem('token');
    const lang = getLocalStorageItem('lang');

    dispatch(setLangAction((lang as AppI18nLang) || 'en'));

    if (user) {
      dispatch(setUserAction(user));
      dispatch(setAuthAction({ logged: true, token }));
      stopLoading();
    }

    onGetUser(token);
  }, []);

  const onGetUser = async (token: string) => {
    const { data } = await authService();

    if (data) {
      const user = data.Auth;

      dispatch(setUserAction(user));
      dispatch(setAuthAction({ logged: true, token }));
    }

    stopLoading();
  };

  return loading ? <Loading /> : props.children;
};
