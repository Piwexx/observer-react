import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      exclude: ['**/*.stories.tsx', 'test/', '**/*.test.tsx', '**/*.test.ts'],
      tsconfigPath: 'tsconfig.app.json',
    }),
  ],
});
