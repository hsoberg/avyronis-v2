/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'image.thum.io',
      },
    ],
  },
  async rewrites() {
    const henningHost = [
      {
        type: 'host',
        value: 'henning.avyronis.com',
      },
    ]

    return {
      beforeFiles: [
        {
          source: '/',
          has: henningHost,
          destination: '/henning',
        },
        {
          source: '/robots.txt',
          has: henningHost,
          destination: '/henning/robots.txt',
        },
        {
          source: '/sitemap.xml',
          has: henningHost,
          destination: '/henning/sitemap.xml',
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

module.exports = nextConfig
