/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "myblog-strapiv4.herokuapp.com"],
  },
};

module.exports = nextConfig;
