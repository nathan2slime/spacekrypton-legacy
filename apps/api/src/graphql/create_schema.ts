import { buildSchema } from 'type-graphql';

import resolvers from './resolvers/index';
import { authChecker } from '../auth';

export const createSchemaGraphql = async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
    authMode: 'error',
    validate: false,
  });

  return schema;
};
