const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version,
  },
  async redirects() {
    return [
      {
        source: "/t",
        destination: "/",
        permanent: true,
      },
    ];
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error"],
          }
        : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
