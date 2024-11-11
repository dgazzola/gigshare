const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = ["development", "test", "e2e"].includes(
  process.env.NODE_ENV || "development"
);

module.exports = {
  entry: [path.join(__dirname, "./src/main.js")],
  context: path.resolve(__dirname),
  devtool: isDevelopment ? "source-map" : false,
  mode: isDevelopment ? "development" : "production",
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GOOGLE_MAPS_API': JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API),
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
    new HtmlWebpackPlugin({
      title: "Engage",
      template: path.join(__dirname, "public/index.template.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/env"],
          plugins: [
            isDevelopment && require.resolve("react-refresh/babel"),
          ].filter(Boolean),
          cwd: path.resolve(__dirname),
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
      },
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
              esModule: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "@Components": path.resolve(__dirname, "src/components/"),
      "@Providers": path.resolve(__dirname, "src/providers/"),
    },
    extensions: ["*", ".js", ".scss"],
  },
  output: {
    path: path.resolve(__dirname, "../server/public/dist"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "public/"),
    historyApiFallback: true,
    port: 3000,
    hot: true, // Enable hot reloading
    proxy: [
      {
        context: ["/auth", "/api"],
        target: "http://localhost:4000",
      },
    ],
  },
};
