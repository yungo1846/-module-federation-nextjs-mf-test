/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    const federationConfig = {
      name: "todo",
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./todoPage": "./src/pages/todo",
        "./console": "./src/utils/console",
      },
      shared: {
        // whatever else
      },
    };
    const NextFederationConfig = {
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
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "export",
  distDir: "dist",
};

module.exports = nextConfig;
