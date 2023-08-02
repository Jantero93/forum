import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/

import type { InlineConfig } from 'vitest';
import type { UserConfig } from 'vite';

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true
  },
  preview: {
    port: 3000
  },
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        // Safe to ignore warning https://github.com/TanStack/query/issues/5175
        const safeToIgnoreWarning =
          warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
          warning.message.includes('use client');

        if (safeToIgnoreWarning) {
          return;
        }

        warn(warning);
      }
    }
  }
};

export default defineConfig(config);
