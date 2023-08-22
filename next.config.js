/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    PAXER_API_URL: process.env.PAXER_API_URL,
    PAXER_AUTH_URL: process.env.PAXER_AUTH_URL,
    PAXER_AUTH_CLIENT_ID: process.env.PAXER_AUTH_CLIENT_ID,
    PAXER_AUTH_CLIENT_SECRET: process.env.PAXER_AUTH_CLIENT_SECRET,
    PAXER_AUTH_USER_POOL: process.env.PAXER_AUTH_USER_POOL,
  },

  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,

  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'images.unsplash.com',
      'paxer.com',
      'i.pravatar.cc',
      'images.pexels.com',
      'https://maps.gstatic.com',
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
          icon: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
