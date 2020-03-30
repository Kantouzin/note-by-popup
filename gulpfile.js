const { src, dest, watch, series, parallel } = require('gulp');
const replace = require('gulp-replace');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const pkg = require('./package.json');

const compileJS = () =>
  webpackStream(webpackConfig, webpack)
    .pipe(dest('dist'));

const copyPublic = () =>
  src('public/**/*')
    .pipe(dest('dist'));

const config = () =>
  src('public/manifest.json')
    .pipe(replace('[NAME]', pkg.name))
    .pipe(replace('[VERSION]', pkg.version))
    .pipe(replace('[DESCRIPTION]', pkg.description))
    .pipe(dest('dist'));

const watchJS = () =>
  watch('src/**/*', compileJS);

const watchPublic = () =>
  watch('public/**/*', copyPublic);

exports.default = parallel(watchJS, watchPublic);
exports.task = series(compileJS, copyPublic, config);
