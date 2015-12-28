'use strict';

var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")(),
    babelify = require('babelify'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var startWatchify = () => {

    // コンパイル対象ファイルのディレクトリ名
    const srcDir = './src';

    // コンパイル先ディレクトリ
    const distDir = './dist';

    // コンパイル対象のファイル名
    const sources = ['bundle1.js', 'bundle2.js'];
    sources.forEach((entryPoint) => {

        // browserifyに渡すオプション群
        let browserifyOptions = {
            // コンパイル対象となるファイル
            entries: [srcDir + '/' + entryPoint],
            // react, e2015, stage-2 プリセットを適用しつつ、babelifyを使って対象をコンパイルする。
            // http://babeljs.io/docs/plugins/
            transform: babelify.configure({presets: ["es2015", "react", "stage-2"]}),
            debug: true,
            //watchifyの差分ビルドを有効化
            cache: {},
            packageCache: {}
        };

        let watchifyStream = watchify(browserify(browserifyOptions));

        let execBundle = () => {
            plugins.util.log(` building plugins{entryPoint}...`);
            return watchifyStream
                .bundle()
                .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
                .pipe(plugins.plumber())
                .pipe(source(entryPoint))
                .pipe(buffer())
                .pipe(gulp.dest(distDir));
        };

        watchifyStream.on('update', execBundle);
        watchifyStream.on('log', plugins.util.log);

        return execBundle();
    });


};

gulp.task('default', startWatchify);
