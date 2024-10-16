// Set this to be the namespace of your library
const namespace = ['Contoso', 'ListingsAdmin'];

// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ClientHooks.js',

        library: namespace,
        libraryTarget: 'var',
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
        config.devtool = 'eval-source-map';
    }
    return config;
};
