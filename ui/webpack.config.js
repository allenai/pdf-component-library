const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const dtsBundle = require('dts-bundle');

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
      new DtsBundlePlugin(bundleName, './tmp/index.d.ts')
    ],
    target: 'web',
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


function DtsBundlePlugin(bundleName, indexPath) {
  DtsBundlePlugin.prototype.apply = function (compiler) {
    compiler.hooks.afterEmit.tap('Bundle .d.ts files', compilation => {
      if (compilation.emittedAssets.has('../tmp/index.d.ts')) {
        dtsBundle.bundle({
          name: bundleName,
          main: indexPath,
        });
      }
    });
  };
}
