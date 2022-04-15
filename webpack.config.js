const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./songbook/app.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "./songbook"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  // externals: [nodeExternals()],
  resolve: {
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
    },
  },
};
