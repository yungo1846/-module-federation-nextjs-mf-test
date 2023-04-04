/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");

const s3 = "https://mfa-test-2023.s3.ap-northeast-2.amazonaws.com";

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    const federationConfig = {
      name: "counter",
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./counterPage": "./src/pages/counter",
        "./counterProvider": "./src/context/count",
        "./counter": "./src/components/counter",
      },
    };
    const NextFederationConfig = {
      name: "counter",
      remotes: {
        container: `container@${
          dev ? "http://localhost:3000" : `${s3}/container`
        }/_next/static/chunks/remoteEntry.js`,
        counter: `counter@${
          dev ? "http://localhost:3001" : `${s3}/counter`
        }/_next/static/chunks/remoteEntry.js`,
      },
      filename: "static/chunks/remoteEntry.js",
      exposes: {
        "./counterPage": "./src/pages/counter",
        "./counterProvider": "./src/context/count",
        "./counter": "./src/components/counter",
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
