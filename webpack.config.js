const { NODE_ENV } = process.env;
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: NODE_ENV,
    entry: './index.tsx',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            '@Pages': path.resolve(__dirname, './src/pages'),
            '@Components': path.resolve(__dirname, './src/components'),
            '@Assets': path.resolve(__dirname, './src/assets'),
            '@Styles': path.resolve(__dirname, './src/styles'),
            '@Helpers': path.resolve(__dirname, './src/helpers')
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    NODE_ENV === 'development'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(svg|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'assets/',
                        },
                    },
                ],
            },
        ],
    },
    devtool: NODE_ENV === 'production' ? undefined : 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[name].[hash:8].css',
        }),
    ],
}