const webpack = require('webpack');
const path = require('path');
const util = require('gulp-util');
const config = require('./gulp/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createConfig(env) {
  let isProduction,
    webpackConfig;

  if (env === undefined) {
    env = process.env.NODE_ENV;
  }

  isProduction = env === 'production';

  webpackConfig = {
    mode: isProduction?'production':'development',
    context: path.join(__dirname, config.src.js),
    entry: {
      // vendor: ['jquery'],
      app: './app.js',
    },
    output: {
      path: path.join(__dirname, config.dest.js),
      filename: '[name].js',
      publicPath: 'js/',
    },
    devtool: isProduction ?
      '#source-map' :
      '#cheap-module-eval-source-map',
    plugins: [
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     filename: '[name].js',
      //     minChunks: Infinity
      // }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            formatter: require('eslint-formatter-pretty')
          }
        }
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false,
      }),
    ],
    resolve: {
      extensions: ['.js'],
      alias: {
        TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
        '@focus-reactive/inline-edit': path.resolve('./', 'inline-edit'),
      },
    },
    optimization :{
      minimize: isProduction
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          loader: 'eslint-loader',
          options: {
            fix: true,
            cache: true,
            configFile: path.resolve(__dirname, '.eslintrc.js')
          }
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.jsx?$/],

        },
        {
            test: /\.glsl$/,
            loader: 'webpack-glsl-loader'
        }],
    },
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
