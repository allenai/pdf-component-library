const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const bundleName = 'pdf-components';
  const isProduction = process.env.NODE_ENV === 'production' || argv.mode === 'production';

  return {
    entry: './library/index.ts',
    mode: isProduction ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.(less|css)$/,
          use: [
            { loader: isProduction ? MiniCssPlugin.loader : 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
          ],
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devtool: 'eval-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssPlugin({
        filename: `${bundleName}.css`,
      }),
    ],
    target: 'node',
    externalsPresets: {
      node: true,
    },
    externals: [
      nodeExternals(),
    ],
    output: {
      filename: `${bundleName}.js`,
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'PdfComponents',
        type: 'umd',
        export: 'default',
      }
    },
  };
};


