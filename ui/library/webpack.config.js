const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');
const dtsBundle = require('dts-bundle');
const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = (env, argv) => {
  const bundleName = 'pdf-components-dist';
  const isProduction = process.env.NODE_ENV === 'production' || argv.mode === 'production';

  return {
    entry: './index.ts',
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
      new RemovePlugin({
        before: {
          root: './dist',
          test: [
            {
              folder: '.',
              method: () => true,
            }
          ],
          exclude: [
            'package.json',
            'LICENSE'
          ]
        }
      }),
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
        name: 'PdfComponentsDist',
        type: 'umd',
        export: 'default',
      }
    },
    externals: {
      "react": {
        "commonjs": "react",
        "commonjs2": "react",
        "amd": "react",
        "root": "React"
      },
      "react-dom": {
        "commonjs": "react-dom",
        "commonjs2": "react-dom",
        "amd": "react-dom",
        "root": "ReactDOM"
      }
    }
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
