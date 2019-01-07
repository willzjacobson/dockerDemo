const { join, resolve } = require('path');
const fs = require('fs');
const { promisify } = require('util');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { dom } = require('@fortawesome/fontawesome-svg-core');

const readFileAsync = promisify(fs.readFile);

const outputDirectory = join(__dirname, 'dist');

module.exports = async env => {
  // These config options are used whether this is a development or production build
  const baseConfig = {
    // reference pre-build line numbers in dev mode
    devtool: 'cheap-module-source-map',
    entry: './src/renderers/dom.tsx',
    output: {
      // publicPath specifies the public URL of the output directory when referenced in a browser
      // Without this, webpack dev server could not locate the bundles when loading the app on a nested entrypoint
      publicPath: '/',
      // Absolute directory path where bundled content is placed
      path: outputDirectory,
      // filename of JS bundle
      filename: '[name].[hash].bundle.js',
    },
    resolve: {
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.css',
        'ico',
        'eot',
        'ttf',
        'woff',
        'woff2',
        'png',
      ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // These options apply only for the bundle for browsers, not for the node build.
            // This is because browsers generally require more intensive transpilation from Node,
            // And there's no need to perform those heavy transformations with Node
            options: {
              presets: [
                '@babel/preset-react', // necessary transpilation react & JSX
                [
                  '@babel/preset-env',
                  {
                    debug: false, // limit console output
                    // Only perform necessary transpilation for browsers that have >5% market share,
                    // intentionally leaving out Internet Explorer 11 (which requires everything)
                    targets: {
                      browsers: ['> 5%', 'not ie 11'],
                    },
                    // Only apply the babel plugins needed to tanspile JS features that are used in the code
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(jpg|jpeg|gif)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', // keep the same filename
          },
        },
        {
          test: /\.(ico|eot|ttf|woff|woff2|png)$/,
          loader: 'url-loader',
          include: [join(__dirname, 'src'), /node_modules/],
          options: {
            name: '[name].[ext]', // keep the same filename
          },
        },
        {
          // allows inline use of SVGs in the code (nice option to have)
          test: /\.svg$/,
          loader: 'svg-inline-loader',
        },
        {
          // For processing custom css modules (hashes class names)
          test: /\.css$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: env.development
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            },
            {
              // creates type files for css modules on the fly during build
              loader: 'typings-for-css-modules-loader',
              options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-import'),
                  require('postcss-mixins'),
                  require('postcss-nested'),
                  require('postcss-simple-vars'),
                  require('postcss-flexbugs-fixes'),
                  require('postcss-flexbox'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        },
        {
          // For processing 3rd party CSS (preserves class names)
          test: /\.css$/,
          exclude: [/src/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: env.development ? '[name].css' : '[name].[hash].css',
        chunkFilename: env.development ? '[id].css' : '[id].[hash].css',
      }),
      new OptimizeCssAssetsWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'root',
        // In prod mode we intentionally do not call it 'index.html'
        // so it is ignored by express.static.
        // However, webpack dev server prefers 'index.html'
        filename: env.development ? 'index.html' : 'generated.html',
        title: 'DEMO',
        // Including Font Awesome CSS so svgs are styled correctly on server render
        headHtmlSnippet: `
          <style>${dom.css().replace(/\s/g, '')}</style>`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
        },
      }),
    ],
    // OPTIMIZATION: We are splitting the code into 2 bundles
    // 1) a 'main' bundle consisting of our source code
    // 2) a 'vendor' bundle consisting of our dependencies
    // This makes use of client-side caching:
    // If we push an update to our source code changes but dependencies do not change,
    // only the 'main' (smaller) bundle must be re-fetched by the browser
    optimization: {
      // Tells webpack to extract a 'vendor' bundle of dependencies
      splitChunks: {
        chunks: 'initial',
      },
      // Creates a 'manifest' file to keep track of which bundle should be updated
      // when various files are changed
      runtimeChunk: {
        name: 'manifest',
      },
    },
  };

  // If this is a development build, include plugins useful for debugging
  // (these use resources and increase the bundle size)
  if (env.development) {
    const devConfig = {
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // When webpack has trouble buidling a module into the bundle,
        // Show the readable filename of the module in the logs
        new webpack.NamedModulesPlugin(),
      ],
      devServer: {
        host: '0.0.0.0', // make available to other hosts on the local network
        port: 3000,
        hot: true, // enable hot reloading
        overlay: true, // error overlay
        historyApiFallback: true, // serve index.html regardless of entrypoint url
        proxy: {
          '/api': 'http://localhost:8080',
        },
      },
    };

    // Webpack Merge is a simple module to make building the config object easier
    return merge(baseConfig, devConfig);
  } else {
    // Production build; just use the baseConfig
    return baseConfig;
  }
};
