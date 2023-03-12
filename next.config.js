/** @type {import('next').NextConfig} */


const nextConfig = {
    trailingSlash: false,
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