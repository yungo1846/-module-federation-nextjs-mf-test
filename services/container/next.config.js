/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const s3 = "https://mfa-test-2023.s3.ap-northeast-2.amazonaws.com";

const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    reactStrictMode: true,
    webpack(config, { dev }) {
      config.experiments = { ...config.experiments, topLevelAwait: true };

      const federationConfig = {
        name: "container",
        remotes: {
          counter: `counter@${
            dev ? "http://localhost:3001" : `${s3}/counter`
          }/_next/static/chunks/remoteEntry.js`,
          todo: `todo@${
            dev ? "http://localhost:3002" : `${s3}/todo`
          }/_next/static/chunks/remoteEntry.js`,
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
    basePath: isDev ? "" : "/container",
    typescript: {
      ignoreBuildErrors: true,
    },
  };
};

module.exports = nextConfig;
