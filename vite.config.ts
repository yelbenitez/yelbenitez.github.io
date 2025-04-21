import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/yelbenitez-github-io.onrender.com',
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://s3.eu-west-2.amazonaws.com/interview.mock.data',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});
