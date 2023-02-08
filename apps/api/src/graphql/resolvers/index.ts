import { NonEmptyArray } from 'type-graphql';

import { SatelliteResolver } from './satellites.resolvers';
import { UserResolver } from './users.resolvers';

import 'reflect-metadata';

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  SatelliteResolver,
];

export default resolvers;
