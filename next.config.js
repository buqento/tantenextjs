const Dotenv = require("dotenv-webpack")
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
    pwa: {
        dest: "public",
        runtimeCaching,
    },
    images: {
        domains: ['cdn.statically.io', 'images.unsplash.com', 'placeimg.com'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    }
})