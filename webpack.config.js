const path = require('path');
//const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./src/index.tsx', './src/less/index.less'],
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
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
    // This copies everything that isn't `index.html` from `public/` into the build output
    // directory.
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'node_modules/pdfjs-dist/cmaps/',
    //       to: 'cmaps/',
    //     },
    //   ],
    // }),
  ],
  output: {
    filename: 'main.[fullhash:6].js',
    path: path.resolve(__dirname, 'build'),
  },
};
