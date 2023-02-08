import mongoose from 'mongoose';
import envs from '@kry/envs';

import { log } from '../log';

export const connect = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(envs.database);
  } catch (error) {
    log.error(error);
  }
};
