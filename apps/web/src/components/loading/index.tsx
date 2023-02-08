import Head from 'next/head';
import { Triangle } from 'react-loader-spinner';
import { themes } from '@kry/themes';

import { LoadingWrapper } from './styles';

const Loading = () => {
  return (
    <LoadingWrapper>
      <Head>
        <title>Space Krypton</title>
      </Head>

      <Triangle height="40px" visible width="40px" color={themes.dark.primaryColorDown} />
    </LoadingWrapper>
  );
};

export default Loading;
