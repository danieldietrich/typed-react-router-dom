const path = require('path');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
        entry: './lib/index.tsx',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        plugins: [
            // creates externals based on {package.json}.peerDependencies
            new PeerDepsExternalsPlugin()
        ],
        module: {
            rules: [
                { test: /\.(ts|tsx)$/, loader: "ts-loader" },
            ]
        }
};