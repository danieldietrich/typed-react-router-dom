const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isProd = argv && argv.mode === 'production';
    const isDev = !isProd;
    const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
    const cssLoader = {
        loader: "css-loader",
        options: {
            camelCase: true,
            localIdentName: '[local]--[hash:base64:5]',
            minimize: isProd,
            sourceMap: isDev
        }
    };
    const lessLoader = {
        loader: "less-loader",
        options: {
            javascriptEnabled: true,
            sourceMap: isDev
        }
    };
    return {
        entry: './src/index.tsx',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            compress: true,
            historyApiFallback: true,
            host: "127.0.0.1",
            port: 8080
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        module: {
            rules: [
                { test: /\.(ts|tsx)$/, loader: "ts-loader" },
                { test: /.css$/, use: [ styleLoader, cssLoader ] },
                { test: /.less$/, use: [ styleLoader, cssLoader, lessLoader ] }
            ]
        }
    };
};