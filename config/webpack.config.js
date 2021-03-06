const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PATHS = {
  root: path.resolve(__dirname, '..'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  src: path.resolve(__dirname, '../client'),
  dist: path.resolve(__dirname, '../dist'),
};

const DEV_SERVER = {
  hot: true,
  hotOnly: true,
  historyApiFallback: true,
  overlay: true,
  // stats: 'verbose',
  // proxy: {
  //   '/api': 'http://localhost:3000'
  // },
};

module.exports = (env = {}) => {
  console.log({ env });
  const isBuild = !!env.build;
  const isDev = !env.build;
  const isSourceMap = !!env.sourceMap || isDev;

  return {
    cache: true,
    devtool: isDev ? 'eval-source-map' : 'source-map',
    devServer: DEV_SERVER,

    context: PATHS.root,

    entry: {
      app: [
        'react-hot-loader/patch',
        './client/index.tsx',
      ],
    },
    output: {
      path: PATHS.dist,
      filename: isDev ? '[name].js' : '[name].[hash].js',
      publicPath: '/',
      // chunkFilename: '[id].chunk.js',
    },

    resolve: {
      alias: {
        'Store': path.resolve(__dirname, '../client/store'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['client', 'node_modules'],
    },

    module: {
      rules: [
        // typescript
        {
          test: /\.tsx?$/,
          include: PATHS.src,
          use: [
              { loader: 'react-hot-loader/webpack' },
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  compilerOptions: {
                    'sourceMap': isSourceMap,
                    'target': isDev ? 'es2015' : 'es5',
                    'isolatedModules': true,
                    'noEmitOnError': false,
                  },
                },
              },
            ]
          ,
        },
        // json
        {
          test: /\.json$/,
          include: [PATHS.src],
          use: { loader: 'json-loader' },
        },
        // css
        {
          test: /\.css$/,
          use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  modules: false,
                  sourceMap: true,
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9' // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          }

        // // less
        // {
        //   test: /\.less$/,
        //   include: [PATHS.STYLES],
        //   loader: ExtractTextPlugin.extract([
        //     'css-loader?{modules: false}',
        //     'less-loader',
        //   ]),
        // },
        // // images
        // {
        //   test: /\.(jpg|jpeg|png|gif|svg)$/,
        //   include: [PATHS.IMAGES],
        //   use: {
        //     loader: 'url-loader',
        //     options: {
        //       name: 'images/[hash].[ext]',
        //       limit: 1000, // inline file data until size
        //     },
        //   },
        // },
        // // fonts
        // {
        //   test: /\.(woff|woff2|ttf|eot)$/,
        //   include: [
        //     PATHS.ASSETS,
        //   ],
        //   use: {
        //     loader: 'file-loader',
        //     options: {
        //       name: 'fonts/[name].[hash].[ext]',
        //     },
        //   },
        // },
      ],
    },

    plugins: [
      new DashboardPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isDev ? 'development' : 'production'),
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      ...(isDev ? [
        new webpack.HotModuleReplacementPlugin({
          // multiStep: true, // better performance with many files
        }),
        new webpack.NamedModulesPlugin(),
      ] : []),
      ...(isBuild ? [
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          compress: {
            screw_ie8: true
          },
          comments: false,
          sourceMap: isSourceMap,
        }),
      ] : []),
    ]
  };

};
