/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    //   appDir: true, as it wasn't experimental anymore
      serverComponentsExternalPackages: ["mongoose"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig