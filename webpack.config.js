const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: { rules: [{ test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    },] },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
      },
      plugins: [ new CopyPlugin({
        patterns: [
          { from: "./img/frontCards", to: "./img/frontCards" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      })]
};
