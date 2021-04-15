const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

config = {
    // Point d'entrée de notre application JavaScript
    entry: './src/js/index.js',
    // Paramètres de sortie (nom du fichier JavaScript principal, chemin...)
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    // Mode de build ('development' ou 'production')
    mode: 'production',
    module: {
        rules: [
            /*
            * Test des fichiers JavaScript
            * babel-loader : transpile ("traduit") le code ES6+ en code interpretable par tous les navigateurs
            */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            /*
            * Test des fichiers HTML
            * html-loader : dit à Webpack comment interpreter le code HTML,
            * et ajoute des tags (<script> ou <link rel="stylesheet">) dans chaque fichier HTML généré
            * vers les fichiers JavaScript et CSS de l'application
            */
            {
                test: /\.html/,
                loader: 'html-loader',
            },
            /*
            * Test des fichiers HBS
            * hbs-loader : dit à Webpack comment interpreter le code des templates hbs,
            */
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
            },
            /*
             * Test des fichiers .scss
             * MiniCssExtractPlugin.loader : extrait le code CSS importé dans les fichiers JavaScript
             * css-loader : dit à Webpack comment interpreter le code CSS
             * postcss-loader : ajout des plugins CSS (paramétrés dans postcss.config.js)
             * sass-loader : transforme le code SCSS en CSS
             */
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                'cssnano',
                            ]
                        }
                    }
                }, 'sass-loader']
            },
            /*
             * Test des images et polices
             * Utilisation du module Webpack "Assets module" afin de générer ces fichiers en tant que ressource
             * + paramétrage du nom et du chemin des fichiers de sortie
             */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
        ]
    },
    plugins: [
        // Génère un document HTML à partir du template indiqué
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        // Options de sortie de la feuille de style générée
        new MiniCssExtractPlugin({
            filename: `style.css`
        })],
};

module.exports = config;
