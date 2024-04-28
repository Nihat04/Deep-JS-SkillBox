// eslint-disable-next-line no-undef
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line no-undef
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-undef
module.exports = (env) => ({
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'main.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Форма оплаты',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
});
