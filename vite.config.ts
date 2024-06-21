import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@_assets': path.resolve(__dirname, 'src/_assets/'),
      '@_components': path.resolve(__dirname, 'src/_components/'),
      '@_constants': path.resolve(__dirname, 'src/_constants/'),
      '@_context': path.resolve(__dirname, 'src/_context/'),
      '@_interfaces': path.resolve(__dirname, 'src/_interfaces/'),
      '@_utilities': path.resolve(__dirname, 'src/_utilities/'),
      '@_scenes': path.resolve(__dirname, 'src/_scenes/'),
      '@_services': path.resolve(__dirname, 'src/_services/'),
      '@_validators': path.resolve(__dirname, 'src/_validators/'),
    }
  }
})
