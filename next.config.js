const Dotenv = require("dotenv-webpack")
module.exports = {
    images: {
        domains: ['cdn.statically.io'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    }
}