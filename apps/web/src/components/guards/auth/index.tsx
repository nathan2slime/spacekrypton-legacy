import { NextComponentType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loading from '@/components/loading';
import { AppState } from '@/store';

const protecteds = ['/admin'];

type Guard = <T>(
  Component: NextComponentType | NextPage<T>
) => (props: T | any) => JSX.Element;

export const withGuard: Guard = Component => props => {
  const [authorized, setAuthorized] = useState(false);
  const { pathname, push } = useRouter();
  const { logged, user } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    const isAuth = pathname.includes('login') || pathname.includes('signup');

    if (pathname.includes('admin') && !(user?.roles || []).includes('admin')) {
      push('/');
      return;
    }

    if (logged && isAuth) {
      push('/');
      return;
    }

    if (!logged && !isAuth) {
      protecteds.forEach(route => route == pathname && push('/login'));
      return;
    }

    setTimeout(() => {
      setAuthorized(true);
    }, 1000);

    return;
  }, []);

  return authorized ? <Component {...props} /> : <Loading />;
};

export const withMe: Guard = Component => props => {
  const { push } = useRouter();
  const { logged } = useSelector((state: AppState) => state.auth);

  useEffect(() => !logged && props.me && push('/auth/login'), []);

  return <Component {...props} />;
};
