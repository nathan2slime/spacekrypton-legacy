import { Config } from '@stencil/core';

import { sass } from '@stencil/sass';

import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'core',
  taskQueue: 'async',
  sourceMap: true,
  extras: {
    experimentalImportInjection: true,
  },
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/global.scss'],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'dist-hydrate-script',
      dir: 'hydrate',
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
      includeGlobalScripts: false,
    },
    reactOutputTarget({
      componentCorePackage: '@kry/core',
      proxiesFile: '../react/src/components.ts',
      includeDefineCustomElements: true,
    }),
  ],
};
