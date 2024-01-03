/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };
    return config;
  }
}

module.exports = nextConfig
