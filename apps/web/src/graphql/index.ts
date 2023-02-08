import envs from '@kry/envs';
import { dispatchCustomEvent, getLocalStorageItem } from '@/utils/funcs';
import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import { KryAlert } from '@kry/core/dist/types/utils/types';

export const client = new ApolloClient({
  uri: '/api/graphql',
  headers: {
    Authorization: getLocalStorageItem(envs.localStorageKeys.token),
    'content-language': getLocalStorageItem(envs.localStorageKeys.lang) || 'en',
  },
  cache: new InMemoryCache(),
  ssrMode: true,
});

type Cronos<T> = {
  query: DocumentNode | TypedDocumentNode;
  variables: T;
  type: 'query' | 'mutation';
  notify?: boolean;
};

const graphql = async <F, T extends {}>({
  query,
  type = 'query',
  variables,
  notify = true,
}: Cronos<T>) =>
  (type == 'mutation'
    ? client.mutate<F, T>({
        mutation: query,
        variables,
      })
    : client.query<F, T>({
        query,
        variables,
      })
  )
    .then(res => res)
    .catch(err => {
      notify &&
        dispatchCustomEvent<KryAlert>('setAppAlert', document, {
          title: err.message,
          color: 'tertiary',
          open: true,
        });

      return { data: null, errors: err };
    });

export default graphql;
