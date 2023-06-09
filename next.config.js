/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co",
      "w9rnfcy7mm78.cloudfront.net",
      "d2w9rnfcy7mm78.cloudfront.net",
      "cdn.are.na",
    ],
  },
};

module.exports = nextConfig;
