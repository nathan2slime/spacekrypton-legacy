import { KryProfile } from '@kry/react';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useSelector } from 'react-redux';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import { withMe } from '@/components/guards/auth';
import { getProfileService } from '@/services/user.services';
import { UserType } from '@/types/auth.types';

import { AppState } from '@/store';

import avatar from '@/assets/images/avatar.jpg';

export type ProfileProps = {
  user?: UserType;
  me: boolean;
};

const Profile: NextPage<ProfileProps> = ({ user, me }) => {
  const { auth } = useSelector((state: AppState) => state);

  return <KryProfile avatarDefault={avatar.src} user={me ? auth.user : user} me={me} />;
};

export default withMe(Profile);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          id: 'me',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetServerSideProps = async (
  context: GetStaticPropsContext
) => {
  const { id } = context.params as NextParsedUrlQuery;

  if (id == 'me')
    return {
      props: {
        me: true,
      },
    };

  const { data } = await getProfileService(id as string, true);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: data.Profile,
      me: false,
    },
    revalidate: 10,
  };
};
