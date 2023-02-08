import { Resolver, Arg, Query, Ctx } from 'type-graphql';

import { SatellitesServices } from '../../services/satellites.services';
import {
  Altitude,
  AltitudeInput,
  Satellite,
  SatellitePositionInput,
  SearchSatelliteInput,
} from '../schemas/satellites.schemas';
import type { AppContext } from '../../auth';

import 'reflect-metadata';

@Resolver()
export class SatelliteResolver {
  satellitesServices: SatellitesServices = new SatellitesServices();

  @Query(() => Satellite)
  async TrackSatellite(
    @Arg('data') data: SatellitePositionInput,
    @Ctx() ctx: AppContext
  ): Promise<Satellite> {
    return await this.satellitesServices.positions(data, ctx.lang);
  }

  @Query(() => [Satellite])
  async SearchSatellite(
    @Arg('data') data: SearchSatelliteInput,
    @Ctx() ctx: AppContext
  ): Promise<Satellite[]> {
    return await this.satellitesServices.search(data, ctx.lang);
  }

  @Query(() => Altitude)
  async GetAltitude(
    @Arg('data') data: AltitudeInput,
    @Ctx() ctx: AppContext
  ): Promise<Altitude> {
    return await this.satellitesServices.getAltitude(data, ctx.lang);
  }
}
