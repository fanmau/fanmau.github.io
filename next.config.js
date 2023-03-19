/** @type {import('next').NextConfig} */

// const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
    trailingSlash: false,
    // router: { base: 'https://fanmau.github.io' },
    // assetPrefix: isProd ? 'https://fanmau.github.io' : undefined,
    // exportPathMap: async function (defaultPathMap) {
    //   return {
    //     '/sitemap.xml': { page: '/sitemap.xml' },
    //     ...defaultPathMap,
    //   }
    // },
    // async redirects() {
    //   return [
    //     {
    //       source: '/blog/',
    //       destination: '/posts/:slug',
    //       permanent: true,
    //     },
    //   ]
    // },
    async rewrites() {
      return [
        {
          source: '/blog/',
          destination: '/blog/index.html',
        },
      ];
    },
  
  }
  
  module.exports = nextConfig