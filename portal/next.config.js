/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "hi-IN", "hi-EN"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
