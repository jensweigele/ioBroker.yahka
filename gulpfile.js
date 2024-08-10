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
                if (Array.isArray(stats.stats)) {
                    console.log(stats.stats[0].compilation.errors.join('\n'));
                    console.log(stats.stats[1].compilation.errors.join('\n'));
                    return reject(new Error(stats.stats[0].compilation.errors.join('\n')))
                }
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve();
        }));
}

gulp.task('webpack', assets);

gulp.task('default', gulp.series('webpack'));
