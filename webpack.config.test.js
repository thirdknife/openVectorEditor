var path = require('path');
module.exports = {
    devtool: 'eval',
    module: {
        loaders: [{
            test: /\.json$/,
            loader: "json-loader"
        }, {
            test: /\.css$/,
            loader: "style!css?modules&localIdentName=[name]--[local]---[hash:base64:5]"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'app'),
            loader: ['babel'],
            query: {
                stage: 1
            }
        }]
    },
};
