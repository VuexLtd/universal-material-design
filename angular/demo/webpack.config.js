const webpack = require('webpack');
const { resolve } = require('path');
// const aotLoader = require('@ultimate/aot-loader');

const paths = {
    dist: resolve(__dirname, 'dist'),
    src: resolve(__dirname, 'src'),
};

module.exports = {
    entry: resolve(paths.src, 'main.ts'),
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: paths.dist,
        publicPath: '/',
    },
    devServer: {
        contentBase: paths.src,
        publicPath: '/',
        port: 4547,
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
        modules: [
            resolve(__dirname, '../node_modules'),
            "node_modules",
        ],
        alias: {
            '@material-design/angular': resolve(__dirname, '../../dist/angular'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader'],
            },
            {
                test: /\.scss$/,
                include: [resolve(paths.src, 'app')],
                use: ['raw-loader', 'sass-loader'],
            },
            {
                test: /\.scss$/,
                exclude: [resolve(paths.src, 'app')],
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: ['raw-loader'],
            }
        ],
    },
    plugins: [
        // new aotLoader.AotPlugin({
        //     entryModule: './src/app/app.module#AppModule',
        //     tsConfig: './tsconfig.json'
        // }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            paths.src,
            {}
        ),
    ],
}
