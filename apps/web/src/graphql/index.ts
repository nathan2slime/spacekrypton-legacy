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
  cache: new InMemoryCache({
    resultCaching: false,
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
  ssrMode: true,
});

type Cronos<T> = {
  query: DocumentNode | TypedDocumentNode;
  variables: T;
  type: 'query' | 'mutation';
  notify?: boolean;
};

const sendMessage = (message: string) => {
  dispatchCustomEvent<KryAlert>('setAppAlert', document, {
    title: message,
    color: 'tertiary',
    open: true,
  });
};

const graphql = async <F, T extends {}>({
  query,
  type = 'query',
  variables,
  notify = true,
}: Cronos<T>) => {
  try {
    const { data, errors } = await (type == 'mutation'
      ? client.mutate<F, T>({
          mutation: query,
          variables,
        })
      : client.query<F, T>({
          query,
          variables,
        }));

    if (errors && notify) {
      sendMessage(errors[0].message);
    }

    return { data, errors };
  } catch (error) {
    sendMessage('deu algum erro na api');

    return { data: null, errors: error };
  }
};

export default graphql;
