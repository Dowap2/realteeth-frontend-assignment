/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
};

module.exports = nextConfig;
