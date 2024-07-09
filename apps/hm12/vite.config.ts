/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svg from 'vite-plugin-svgr';
import { resolve } from 'path';

export default defineConfig({
  base: 'hm12',
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/hm12',

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
    outDir: '../../dist/apps/hm12',
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
      reportsDirectory: '../../coverage/apps/hm12',
      provider: 'v8',
    },
  },
});
