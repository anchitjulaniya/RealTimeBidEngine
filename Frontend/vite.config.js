import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'socket.io-client': 'socket.io-client/dist/socket.io.js'
    }
  },
  build: {
    rollupOptions: {
      // You typically don’t need to externalize `socket.io-client` unless you have specific reasons.
      // Externalizing can be useful for CDN-based setups, but in most cases, you want to bundle it.
      // external: ['socket.io-client']
    }
  }
});
