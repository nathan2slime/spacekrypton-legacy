import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/', 'index.ts'],
  splitting: false,
  dts: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true,
});
