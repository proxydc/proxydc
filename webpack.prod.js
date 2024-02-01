const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");   

module.exports = {
    entry: {
        main: './server.js'
    },
    output: {
        path: path.join(__dirname, 'prod-build-optimization'),
        publicPath: '/',
        filename: '[name].js',
        clean:true
    },
    mode: 'production',
    target: 'node',
    externals: [nodeExternals()],
    optimization: {
        minimize: true,
        minimizer:[new TerserPlugin({
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        })]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    }
}