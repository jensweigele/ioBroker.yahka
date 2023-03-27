const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js')

function assets() {
    return new Promise((resolve, reject) =>
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve();
        }));
}

gulp.task('webpack', assets);

gulp.task('default', gulp.series('webpack'));