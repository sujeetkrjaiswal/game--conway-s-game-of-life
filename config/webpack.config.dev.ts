import * as  HtmlWebpackPlugin from "html-webpack-plugin"
import * as  path from "path"
import * as webpack from "webpack"

const config: webpack.Configuration = {
  devtool: "eval-source-map",
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '..', "src/ts/index"),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'tslint-loader',
        test: /\.ts$/,
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        exclude: /node_modules/,
        test: /\.(css)$/,
        use: [{
          loader: "style-loader",
        }, {
          loader: "css-loader",
          options: { sourceMap: true },
        }],
      },
    ],
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "___DEV__": true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "../src/favicon.ico"),
      inject: true,
      template: path.resolve(__dirname, "../src/index.ejs"),
      title: "Game",
    }),
  ],
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js", ".json"],
  },
  target: "web",
}

export default config
