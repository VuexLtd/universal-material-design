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
        port: 4546,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        modules: [
            resolve(__dirname, '../node_modules'),
            "node_modules",
        ],
        alias: {
            '@material-design/preact': resolve(__dirname, '../src'),
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
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
}
