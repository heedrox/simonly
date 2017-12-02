require('./check-versions')();

process.env.NODE_ENV = 'production';

var ora = require('ora');
var rm = require('rimraf');
var path = require('path');
var chalk = require('chalk');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.android.conf');

var spinner = ora('building for ANDROID (dist/)...');
spinner.start();

var configOptions = config.android;

rm(path.join(configOptions.assetsRoot, configOptions.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    console.log(chalk.cyan('  Build complete.\n'));
  });
});
