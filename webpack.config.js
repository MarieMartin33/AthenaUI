const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV_TYPE = {
  DEV: 'development',
  PRODUCTION: 'production',
};

module.exports = function(env) {
  const mode = env.mode || ENV_TYPE.PRODUCTION;
  return {
    mode: mode,
    context: sourcePath,
    entry: {
      main: './index.tsx',
    },
    output: {
      path: outPath,
      publicPath: '/',
      filename: 'app.[hash].js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      // Fix webpack's default behavior to not load packages with jsnext:main module
      // https://github.com/Microsoft/TypeScript/issues/11677 
      mainFields: ['main'],
      modules: [
        sourcePath,
        path.join(__dirname, 'node_modules')
      ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|ArachneUIComponents|@types)/gi,
          loader: 'ts-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|ArachneUIComponents)/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {includePaths: [
                  sourcePath,
                  path.join(__dirname, 'node_modules')
                ]},
                additionalData: "$isAppNode: false;"
              },
            },
          ]
        }
      ]
    },
    devServer: {
      contentBase: sourcePath,
      historyApiFallback: true,
      hot: true,
      port: 3000,
      stats: {
        warnings: false
      },
      proxy: {
        '/api': 'http://localhost:3010',
        '/auth/sso': 'http://localhost:3010',
        '/auth/slo': 'http://localhost:3010',
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        hash: true,
        template: 'index.html',
        favicon: 'favicon.ico',
      }),
      new CopyWebpackPlugin({patterns: [
        {
          from: path.join(__dirname, 'node_modules/arachne-ui-components/lib/resources/fonts'),
          to: path.join(outPath, 'fonts')
        },
        {
          from: path.join(__dirname, 'node_modules/arachne-ui-components/lib/resources/material-design-icons/iconfont'),
          to: path.join(outPath, 'fonts')
        },
        {
          from: path.join(__dirname, 'resources/icons'),
          to: path.join(outPath, 'icons')
        },
      ]}),
      new webpack.DefinePlugin({
        __DEV__: mode === ENV_TYPE.DEV,
      }),
    ],
    resolve: {
      fallback: {
        fs: false
      }
    }
  };
}