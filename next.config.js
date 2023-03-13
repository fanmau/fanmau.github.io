/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
    trailingSlash: false,
    assetPrefix: isProd ? 'https://fanmau.github.io' : undefined,
    // exportPathMap: async function (defaultPathMap) {
    //   return {
    //     '/sitemap.xml': { page: '/sitemap.xml' },
    //     ...defaultPathMap,
    //   }
    // },
    // async rewrites() {
    //   return [
    //     {
    //       source: '/sitemap.xml',
    //       destination: '/api/sitemap',
    //     },
    //   ];
    // },
  
  }
  
  module.exports = nextConfig