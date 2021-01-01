const Dotenv = require("dotenv-webpack")
module.exports = {
    images: {
        domains: ['https://cdn.statically.io/img/i.imgur.com/'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new Dotenv({ silent: true }));
        return config;
    }
}