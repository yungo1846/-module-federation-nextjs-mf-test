/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const s3 = "https://mfa-test-2023.s3.ap-northeast-2.amazonaws.com";

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
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
};

module.exports = nextConfig;
