const CracoLessPlugin = require("craco-less");
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#3D619B" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// This useful to change ant design styles #F FBB00 | #F 0324C
