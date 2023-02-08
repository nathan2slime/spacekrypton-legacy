import jwt from 'jsonwebtoken';

import { log } from '../log';
import envs from '@kry/envs';

export type AuthTokenData = {
  id: any;
};

export const createAuthToken = (data: AuthTokenData) => {
  const token = jwt.sign(data, envs.token.hash, { expiresIn: '24h' });

  log.complete('auth token created', data);

  return envs.token.key + ' ' + token;
};

export const decodedAuthToken = (token: string) => {
  try {
    const data = jwt.verify(
      token.replace(' ', '').split(envs.token.key)[1],
      envs.token.hash
    );

    log.complete('auth token decoded', data);

    return data;
  } catch {
    return;
  }
};
