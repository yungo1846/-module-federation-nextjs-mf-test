/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const federationConfig = {
      name: "counter",
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./counterPage": "./src/pages/counter",
        "./counterProvider": "./src/context/count",
      },
    };
    const NextFederationConfig = {
      name: "counter",
      remotes: {
        home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
        counter: `counter@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        todo: `todo@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
      },
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./counterPage": "./src/pages/counter",
        "./counterProvider": "./src/context/count",
      },
      extraOptions: {
        exposePages: true,
      },
    };

    config.plugins.push(
      new FederatedTypesPlugin({ federationConfig }),
      new NextFederationPlugin(NextFederationConfig)
    );

    return config;
  },
};

module.exports = nextConfig;
