const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: 'development',
    entry: {
        smokeTest: './src/tests/smoke.test.ts',
        loadTest: './src/tests/load.test.ts',
        spikeTest: './src/tests/spike.test.ts',
        soakTest: './src/tests/soak.test.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                // exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/typescript']],
                    plugins: [
                        '@babel/proposal-class-properties',
                        '@babel/proposal-object-rest-spread'
                    ]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    // target: 'web',
    externals: /k6(\/.*)?/,
    devtool: 'source-map',
    plugins: [
        new Dotenv()
    ]
};