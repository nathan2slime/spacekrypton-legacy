import { config } from 'dotenv';
import { Signale, SignaleOptions } from 'signale';

config();

const options: SignaleOptions = {
  disabled: false,
  interactive: false,
  scope: process.env.NODE_ENV,
  config: {
    uppercaseLabel: true,
    displayTimestamp: true,
    underlineLabel: false,
    displayFilename: true,
  },
  logLevel: 'info',
  secrets: [],
  stream: process.stdout,
};

export const log = new Signale(options);
