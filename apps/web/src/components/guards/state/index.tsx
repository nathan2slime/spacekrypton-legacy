import { FC } from 'react';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';
import { AppProps } from 'next/app';

export const withAppState = (Component: FC<AppProps>) => (appProps: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(appProps);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};
