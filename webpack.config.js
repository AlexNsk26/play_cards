const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: { rules: [
     {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
     },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    },] },
    resolve: {
      extensions: [".ts", ".js"],
    },
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
