/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    const federationConfig = {
      name: "container",
      remotes: {
        counter: `counter@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
        todo: `todo@http://localhost:3002/_next/static/chunks/remoteEntry.js`,
      },
      filename: "static/chunks/remoteEntry.js",
      // exposes: {
      //   "./home": "./pages/index.tsx",
      // },
      shared: {
        // whatever else
      },
      extraOptions: {
        automaticAsyncBoundary: true,
      },
    };

    config.plugins.push(
      new FederatedTypesPlugin({ federationConfig }),
      new NextFederationPlugin(federationConfig)
    );

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
