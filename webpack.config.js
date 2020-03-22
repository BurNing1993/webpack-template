const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  console.log('ENV', env);
  console.log('argv', argv);
  console.log('NODE_ENV', process.env.NODE_ENV);
  return {
    entry: {
      app: './src/index.js',
      about: './src/about.js',
    },
    devtool: argv.mode === 'production' ? 'inline-source-map' : 'eval',
    devServer: {
      contentBase: './dist'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Home',
        filename: 'index.html',
        template:'public/index.html',
        chunks: ['app'],
        favicon:'public/favicon.ico'
      }),
      new HtmlWebpackPlugin({  
        title:'About',
        filename: 'about.html',
        template:'public/about.html',
        chunks: ['about'],
        favicon:'public/favicon.ico'
      })
    ],
    output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      usedExports: true
    }
  };
}