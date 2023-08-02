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
  }
};

export default defineConfig(config);
