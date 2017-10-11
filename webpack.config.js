/*jshint esversion: 6 */
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const utils = require('./webpack.config.utils');

const port = {
    web: 88,
    was: 8080
};

const pages = [{
    html: 'index',
    script: 'main',
}, {
    html: 'bookmark',
    script: 'bookmark',
}, {
    html: 'sub',
    script: 'sub'
}, {
    html: 'insert',
    script: 'insert'
}, {
    html: 'detail',
    script: 'detail'
}, {
    html: 'report',
    script: 'report'
}, {
    html: 'join',
    script: 'join'
}, {
    html: 'join-food',
    script: 'join-food'
}, {
    html: 'setting',
    script: 'setting'
}];

module.exports = {
    entry: utils.getEntry(pages),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:' + port.web + '/',
        filename: './js/[name].[chunkhash].bundle.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }, {
                    loader: 'less-loader'
                }]
            })
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }]
    },
    devServer: {
        contentBase: './dist',
        port: port.web,
        proxy: {
            '/api': 'http://localhost:' + port.was
        }
    },
    plugins: utils.getPlugins(pages)
};
