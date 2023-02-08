import { Field, InputType, ObjectType } from 'type-graphql';

import { SatelliteOrder, SatelliteSort } from '../enums/satellites.enums';
import 'reflect-metadata';

@ObjectType()
export class Satellite {
  @Field()
  name: string;

  @Field()
  id: number;

  @Field(() => [SatellitePosition])
  positions: SatellitePosition[];
}

@ObjectType()
export class SatellitePosition {
  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field()
  azimuth: number;

  @Field()
  elevation: number;

  @Field()
  ra: number;

  @Field()
  dec: number;

  @Field()
  timestamp: number;

  @Field(() => Boolean)
  eclipsed: boolean;
}

@InputType()
export class AltitudeInput {
  @Field()
  longitude: number;

  @Field()
  latitude: number;
}

@InputType()
export class SearchSatelliteInput {
  @Field(() => SatelliteSort)
  sort: SatelliteSort;

  @Field(() => SatelliteOrder)
  order: SatelliteOrder;

  @Field()
  search: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;
}

@ObjectType()
export class Altitude {
  @Field()
  elevation: number;
}

@InputType()
export class SatellitePositionInput {
  @Field()
  id: number;

  @Field()
  latitude: number;

  @Field()
  longitude: number;

  @Field()
  altitude: number;

  @Field({ defaultValue: 1 })
  seconds: number;
}
