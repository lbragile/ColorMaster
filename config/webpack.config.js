/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const basePath = path.resolve(__dirname, "../");

module.exports = {
  entry: path.join(basePath, "src", "index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          configFile: path.join(__dirname, "tsconfig.json")
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(basePath, "src", "types"),
          to: path.join(basePath, "dist", "types")
        },
        {
          from: path.join(basePath, "README.md"),
          to: path.join(basePath, "dist", "README.md")
        },
        {
          from: path.join(basePath, "CHANGELOG.md"),
          to: path.join(basePath, "dist", "CHANGELOG.md")
        },
        {
          from: path.join(basePath, "LICENSE.md"),
          to: path.join(basePath, "dist", "LICENSE.md")
        },
        {
          from: path.join(basePath, "package.json"),
          to: path.join(basePath, "dist", "package.json")
        }
      ]
    })
  ],
  optimization: {
    minimize: true,
    mangleWasmImports: true,
    removeAvailableModules: false,
    flagIncludedChunks: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true,
    mangleExports: true
  },
  resolve: {
    extensions: [".ts"]
  },
  output: {
    filename: "index.js",
    path: path.join(basePath, "dist")
  }
};
