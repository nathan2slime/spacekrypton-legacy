import { ApolloServer } from '@apollo/server';
import { config } from 'dotenv';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { AppI18nLang } from '@kry/i18n';

import {
  connect,
  AppContext,
  createSchemaGraphql,
  getUserIDByToken,
  log,
} from '@kry/api';
import { appError } from '@kry/errors';

import 'reflect-metadata';

const schema = await createSchemaGraphql();

const server = new ApolloServer<AppContext>({
  schema,
  formatError: (error: any) => {
    const code = error.extensions.code;
    const message = (appError(code, 'en') || error.message) as string;

    log.error(message.toLowerCase(), code);

    return {
      message: error.message,
      code,
    };
  },
});

await connect();

config();

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const lang = (req.headers['content-language'] || 'en') as AppI18nLang;
    const user: any = await getUserIDByToken(req.headers.authorization);

    return { req, res, user, lang };
  },
});
