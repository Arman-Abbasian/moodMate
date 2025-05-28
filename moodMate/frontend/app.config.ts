// app.config.ts
import type { ExpoConfig, ConfigContext } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
  const isDev = process.env.NODE_ENV !== 'production'

  return {
    name: 'frontend', // ✅ اجباری
    slug: 'frontend', // ✅ اجباری
    version: '1.0.0',
    extra: {
      apiUrl: isDev
        ? 'http://192.168.1.100:5000/api/'
        : 'https://api.yourproduction.com',
    },
  }
}
