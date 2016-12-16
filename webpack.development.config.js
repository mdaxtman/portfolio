import path from "path";
import webpack from "webpack";
import BellOnBundlerErrorPlugin from "bell-on-bundler-error-plugin";
import WebpackBrowserPlugin from "webpack-browser-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  context: path.join(__dirname, "src"),
  entry: [
    "./index.jsx",
    "webpack/hot/dev-server",
    "webpack-dev-server/client?http://localhost:8080"
  ],
  output: {
    path: path.join(__dirname, "public"),
    filename: "app.bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          "style-loader",
          "css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]&importLoaders=1",
          "postcss-loader"
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loaders: ["json-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|png|jpg|gif)$/,
        loaders: ["url-loader?name=[path][name].[ext]&limit=10000"],
        exclude: /node_modules/
      },
      {
        test: /.svg$/,
        loaders: [
          "raw-loader",
          "image-webpack-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BellOnBundlerErrorPlugin(),
    new WebpackBrowserPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    })
  ]
};
