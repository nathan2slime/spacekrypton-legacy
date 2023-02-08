import { defineCustomElements, applyPolyfills } from 'earth-satellites/loader';

export * from './src/components';

applyPolyfills().then(() => defineCustomElements());
