/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svg from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  base: 'em41',
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/em41',

  server: {
    port: 4270,
    host: 'localhost',
  },

  preview: {
    port: 4340,
    host: 'localhost',
  },

  plugins: [svg(), react(), nxViteTsPaths()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/em41',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/em41',
      provider: 'v8',
    },
  },
});
