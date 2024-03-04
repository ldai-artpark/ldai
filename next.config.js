/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // appDir: true
    externalDir: true,
  },
  // images: {
  //   domains: ["https://oaidalleapiprodscus.blob.core.windows.net"],
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'oaidalleapiprodscus.blob.core.windows.net',
  //       port: '',
  //       pathname: '**',
  //     },
  //   ],
  // },
}

module.exports = nextConfig
