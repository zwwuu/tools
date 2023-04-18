/** @type {import("next-sitemap").IConfig} */
const siteMapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  generateRobotsTxt: true,
};

module.exports = siteMapConfig;
