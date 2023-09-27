const CracoLessPlugin = require('craco-less');
const path = require('path');
module.exports = {
     webpack: {
          alias: {
               '@': path.resolve(__dirname, 'src'),
          },
     },
     plugins: [
          {
               plugin: CracoLessPlugin,
               options: {
                    lessLoaderOptions: {
                         lessOptions: {
                              modifyVars: { '@primary-color': '#f0324c' },
                              javascriptEnabled: true,
                         },
                    },
               },
          },
     ],
};

// This useful to change ant design styles