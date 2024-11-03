const CracoLessPlugin = require("craco-less");
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      webpackConfig.cache = {
        type: "filesystem",
      };
      return webpackConfig;
    },
    configure: (webpackConfig) => {
      webpackConfig.devtool = false; // Disable source maps for production
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#fc903a" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// // This useful to change ant design styles #F FBB00 | #F 0324C

// const CracoLessPlugin = require("craco-less");
// const path = require("path");
// const TerserPlugin = require("terser-webpack-plugin");
// // const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// module.exports = {
//   webpack: {
//     alias: {
//       "@": path.resolve(__dirname, "src"),
//     },
//     configure: (webpackConfig) => {
//       webpackConfig.cache = {
//         type: "filesystem",
//       };
//       webpackConfig.devtool = false; // Disable source maps for production
//       webpackConfig.optimization = {
//         minimize: true,
//         minimizer: [new TerserPlugin()],
//         splitChunks: {
//           chunks: "all",
//           minSize: 20000,
//           maxSize: 0,
//           minChunks: 1,
//           maxAsyncRequests: 30,
//           maxInitialRequests: 30,
//           automaticNameDelimiter: "~",
//           cacheGroups: {
//             default: {
//               minChunks: 2,
//               priority: -20,
//               reuseExistingChunk: true,
//             },
//             vendor: {
//               test: /[\\/]node_modules[\\/]/,
//               priority: -10,
//               name(module) {
//                 const match = module.context.match(
//                   /[\\/]node_modules[\\/](.+?)([\\/]|$)/
//                 );
//                 if (match) {
//                   const packageName = match[1];
//                   return `npm.${packageName.replace("@", "")}`;
//                 }
//                 return "npm.unknown"; // Fallback if the module context doesn't match
//               },
//             },
//           },
//         },
//       };
//       // webpackConfig.plugins.push(new BundleAnalyzerPlugin()); // Analyze bundles
//       return webpackConfig;
//     },
//   },
//   plugins: [
//     {
//       plugin: CracoLessPlugin,
//       options: {
//         lessLoaderOptions: {
//           lessOptions: {
//             modifyVars: { "@primary-color": "#fc903a" },
//             javascriptEnabled: true,
//           },
//         },
//       },
//     },
//   ],
// };
