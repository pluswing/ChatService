const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        enforce: 'pre',
        loader: 'tslint-loader',
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          /components/
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
          configFile: 'tsconfig.json',
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  output: {
    library: 'PluswingChatService',
    path: path.resolve(__dirname, 'public'),
    filename: "[name].bundle.js",
    libraryTarget: 'umd'
  }
}
