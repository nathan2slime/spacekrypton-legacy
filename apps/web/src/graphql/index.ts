import envs from '@kry/envs';
import { dispatchCustomEvent, getLocalStorageItem } from '@/utils/funcs';
import {
  ApolloClient,
  ApolloClientOptions,
  DocumentNode,
  InMemoryCache,
  TypedDocumentNode,
} from '@apollo/client';
import { KryAlert } from '@kry/core/dist/types/utils/types';
import { AppI18nLang, langs } from '@kry/i18n';

const options: ApolloClientOptions<unknown> = {
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
};

export const client = new ApolloClient({
  ...options,
});

export const server = new ApolloClient({
  ...options,
  uri: envs.api.url.api + '/api/graphql',
});

type Cronos<T> = {
  query: DocumentNode | TypedDocumentNode;
  variables: T;
  type: 'query' | 'mutation';
  ssr?: boolean;
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
  ssr = false,
  notify = true,
}: Cronos<T>) => {
  try {
    const gatway = ssr ? server : client;

    const { data, errors } = await (type == 'mutation'
      ? gatway.mutate<F, T>({
          mutation: query,
          variables,
        })
      : gatway.query<F, T>({
          query,
          variables,
        }));

    return { data, errors };
  } catch (error) {
    const message = (error as any).message as string;

    if (message.includes('504')) {
      const lang = getLocalStorageItem(envs.localStorageKeys.lang);
      sendMessage(langs[lang as AppI18nLang].err.errorUnknow);
    } else if (notify) {
      sendMessage(message);
    }

    return { data: null, errors: error };
  }
};

export default graphql;
