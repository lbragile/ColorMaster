/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const path = require("path");
const glob = require("glob");

/* PATHS TO NECESSARY FOLDERS */
const BASE_PATH = path.resolve(__dirname, "../");
const DIST_PATH = path.join(BASE_PATH, "dist");
const SRC_PATH = path.join(BASE_PATH, "src");
const PLUGINS_PATH = path.join(SRC_PATH, "plugins");

/* GENERATE ENTRIES FOR INDEX & PLUGIN FILES */
const CM_PLUGINS = glob.sync(path.join(PLUGINS_PATH, "*.ts"));

const entry = {
  index: path.join(SRC_PATH, "index.ts")
};

CM_PLUGINS.forEach((plugin) => {
  entry[`plugins/${path.parse(plugin).name}`] = plugin;
});

/* SET LOADER FOR TYPESCRIPT */
const rules = [
  {
    test: /\.ts$/,
    loader: "ts-loader",
    options: {
      configFile: path.join(__dirname, "tsconfig.json")
    },
    exclude: /node_modules/
  }
];

/* CREATE PLUGIN TO COPY ASSETS OVER AFTER BUILD */
const assetArr = ["README.md", "CHANGELOG.md", "LICENSE.md", "package.json"];
const patterns = [
  {
    from: path.join(SRC_PATH, "types"),
    to: path.join(DIST_PATH, "types")
  },
  ...assetArr.map((asset) => ({
    from: path.join(BASE_PATH, asset),
    to: path.join(DIST_PATH, asset)
  }))
];

/* WEBPACK CONFIG */
function generateOutput(type, clean) {
  const isProd = process.env.NODE_ENV === "production";
  const isModule = type === "module";

  return {
    entry,
    mode: process.env.NODE_ENV,
    module: { rules },
    plugins: [
      new CopyPlugin({ patterns }),
      ...(!isModule
        ? [
            new BundleAnalyzerPlugin({
              defaultSizes: "gzip",
              openAnalyzer: false,
              analyzerMode: "static"
            })
          ]
        : [])
    ],
    optimization: {
      minimize: isProd,
      usedExports: true
    },
    stats: {
      usedExports: true,
      providedExports: true,
      env: true
    },
    resolve: {
      extensions: [".ts"]
    },
    experiments: {
      outputModule: isModule
    },
    output: {
      filename: `[name].${isModule ? "m" : ""}js`,
      path: DIST_PATH,
      library: { type },
      module: isModule,
      clean
    }
  };
}

/* BUNDLE AS COMMONJS & ES MODULE */
module.exports = [generateOutput("commonjs2", true), generateOutput("module", false)];
