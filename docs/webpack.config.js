const webpack = require('webpack');
const { resolve } = require('path');

const paths = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
};

module.exports = {
    entry: resolve(paths.src, 'index.tsx'),
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: paths.dist,
        publicPath: '/',
    },
    devServer: {
        hot: true,
        contentBase: paths.src,
        publicPath: '/',
        port: 4540,
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        modules: [
            resolve(__dirname, '../node_modules'),
            resolve(__dirname, '../preact/node_modules'),
            'node_modules',
        ],
        alias: {
            '@material-design/core': resolve(__dirname, '../core/src'),
            '@material-design/preact': resolve(__dirname, '../preact/src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.txt$/,
                use: ['raw-loader'],
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
