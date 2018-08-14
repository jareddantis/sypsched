'use strict';
/* jshint node: true */

/**
    Gulpfile.js:
      Recipe for building the schedmaker app with Gulp.

    Part of the sypsched project by @aureljared.
    Licensed under GPLv3.
*/

var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Build & minify LESS files
gulp.task('css', function() {
    var autoprefixer = require('autoprefixer');
    var csso = require('gulp-csso');
    var less = require('gulp-less');
    var postcss = require('gulp-postcss');
    var unprefix = require('postcss-unprefix');
    del(['dist/css']);

    return gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(postcss([
            unprefix(),
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./dist/'));
});

// Minify JS files
gulp.task('js', function() {
    var concat = require('gulp-concat');
    var babel = require('gulp-babel');
    del(['dist/script.js']);

    return gulp.src([
            './src/js/*.js',
        ])
        .pipe(concat('script.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

// Strip debug logging (must be run after task 'js')
gulp.task('nodebug', function() {
    var strip = require('gulp-strip-debug');
    return gulp.src('./dist/script.js')
        .pipe(strip())
        .pipe(gulp.dest('./dist/'));
});

// Minify SVG files
gulp.task('svg', function() {
    var svgmin = require('gulp-svgmin');
    del(['dist/img/*.svg']);

    return gulp.src('./src/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./dist/img'));
});

// Minify index HTML file
gulp.task('html', function() {
    var rev = require('gulp-append-query-string');
    var htmlmin = require('gulp-htmlmin');
    del(['index.html']);

    return gulp.src('./src/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(rev())
        .pipe(gulp.dest('./'));
});

// Gulp task to minify all files
gulp.task('default', gulp.parallel('css', 'js', 'html'));
gulp.task('all', gulp.parallel('default', 'svg'));
gulp.task('release', gulp.series('default', 'nodebug'));
gulp.task('release-all', gulp.series('all', 'nodebug'));
