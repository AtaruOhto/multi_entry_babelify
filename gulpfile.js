'use strict';

var gulp = require('gulp'),
    $ = require("gulp-load-plugins")(),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var startWatchify = () => {

    let srcDir = './src';
    let distDir = './dist';
    let targetEntries = ['app.js', 'app2.js'];
    let babelOptions = [babelify.configure({optional: ['runtime'], stage: 0})];

    targetEntries.forEach((entry) => {

        let browserifyOptions = {
            entries: [srcDir + '/' + entry],
            transform: babelOptions,
            debug: true
        };

        let watchifyStream = watchify(browserify(browserifyOptions));

        let execBrowserify = () => {
            $.util.log(` building ${entry}........`);
            return watchifyStream
                .bundle()
                .on('error', $.util.log.bind($.util, 'Browserify Error'))
                .pipe($.plumber())
                .pipe(source(entry))
                .pipe(buffer())
                .pipe(gulp.dest(distDir));
        };

        watchifyStream.on('update', execBrowserify);
        watchifyStream.on('log', $.util.log);

        return execBrowserify();
    });


};

gulp.task('default', startWatchify);
