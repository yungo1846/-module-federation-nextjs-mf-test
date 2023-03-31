/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "counter",
        remotes: {
          home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
          todo: `todo@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./counterPage": "./src/pages/counter",
          "./counterProvider": "./src/context/count",
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
