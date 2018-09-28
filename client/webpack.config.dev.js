const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    module: {
        rules: [
            {
                enforce: 'pre',
                loader: 'tslint-loader',
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    emitErrors: true
                }
            },
            {
                loader: 'ts-loader',
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.dev.json'
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },    
    output: {
        library: 'pluswing_chat_client',
        path: path.resolve(__dirname, 'public'),        
        filename: "[name].bundle.js",
        libraryTarget: 'umd'
    }
}
