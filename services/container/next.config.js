/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "container",
        remotes: {
          counter: `counter@http://localhost:3001/_next/static//remoteEntry.js`,
          todo: `todo@http://localhost:3002/_next/static//remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
        // exposes: {
        //   "./home": "./pages/index.tsx",
        // },
        shared: {
          // whatever else
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
