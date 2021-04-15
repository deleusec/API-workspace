const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

config = {
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.html/,
                loader: 'html-loader',
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            files: 'js/**/*.js',
        }),
    ],
};
module.exports = config;
