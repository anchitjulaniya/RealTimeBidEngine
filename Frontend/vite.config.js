// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//    plugins: [react()],
// })


// -----------------

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'socket.io-client': require.resolve('socket.io-client')
    }
  },
  build: {
    rollupOptions: {
      external: ['socket.io-client']

    }
  }
}
);
