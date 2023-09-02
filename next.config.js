/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SITE_API_URL: process.env.SITE_API_URL,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
    AUTH_USER_POOL: process.env.AUTH_USER_POOL,
    NEXT_PUBLIC_PROPERTY_ID: process.env.NEXT_PUBLIC_PROPERTY_ID,
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
      'lh3.googleusercontent.com',
      'https://lh3.googleusercontent.com',
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
