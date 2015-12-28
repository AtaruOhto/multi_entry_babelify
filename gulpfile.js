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
            plugins.util.log(` building ${entryPoint}...`);
            return watchifyStream
                //ソースコードのバンドルを行う
                .bundle()
                //Errorが発生した場合にはログにアウトプットする
                .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
                //Errorが発生してもタスクを止めない
                .pipe(plugins.plumber())
                //streamingをvinyl file objectへと変換する
                .pipe(source(entryPoint))
                //vinyl file objectをvinyl buffered object形式に変換する (gulpプラグインが動作するstream形式へと変換)
                .pipe(buffer())
                //distディレクトリに出力
                .pipe(gulp.dest(distDir));
        };

        // 対象ファイルが変更されたら、バンドル処理を行う。
        watchifyStream.on('update', execBundle);
        watchifyStream.on('log', plugins.util.log);

        return execBundle();
    });


};

gulp.task('default', startWatchify);
