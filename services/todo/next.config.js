/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "todo",
        remotes: {
          home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
          counter: `counter@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./todoPage": "./src/pages/todo",
          "./console": "./src/utils/console",
        },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
