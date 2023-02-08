import { registerEnumType } from 'type-graphql';
import 'reflect-metadata';

export enum SatelliteSort {
  ID = 'id',
  NAME = 'name',
  POPULARITY = 'popularity',
  INCLINATION = 'inclination',
  ECCENTRICITY = 'eccentricity',
  PERIOD = 'period',
}

export enum SatelliteOrder {
  DESC = 'desc',
  ASC = 'asc',
}

registerEnumType(SatelliteSort, { name: 'Sort' });
registerEnumType(SatelliteOrder, { name: 'Order' });
