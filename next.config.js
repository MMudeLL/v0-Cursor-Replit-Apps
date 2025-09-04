/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configuration for production builds
  env: {
    NEXTJS_BUILD_DISABLE_ESLINT: "true",
  },
};

module.exports = nextConfig;