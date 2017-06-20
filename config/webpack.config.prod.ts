import * as  CompressionPlugin from 'compression-webpack-plugin'
import * as  ExtractTextPlugin from "extract-text-webpack-plugin"
import * as  HtmlWebpackPlugin from "html-webpack-plugin"
import * as  path from "path"
import * as webpack from "webpack"

const config: webpack.Configuration = {
  devtool: "source-map",
  entry: [
    path.resolve(__dirname, '..', "src/ts/index"),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        exclude: /node_modules/,
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: { sourceMap: true },
          }],
        }),
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
      "___DEV__": false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "../src/favicon.ico"),
      inject: true,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: path.resolve(__dirname, "../src/index.ejs"),
      title: "Game",
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
      asset: "[path].gz[query]",
      minRatio: 0.8,
      test: /\.(js|html)$/,
      threshold: 10240,
    }),
  ],
  resolve: {
    extensions: ["*", ".tsx", ".ts", ".js", ".json"],
  },
  target: "web",
}

export default config
