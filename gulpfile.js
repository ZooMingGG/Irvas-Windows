"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const htmlmin = require("gulp-htmlmin");
const browsersync = require("browser-sync");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");

const dist = "./dist/";

gulp.task("minify-html", () => {
    return gulp.src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/index.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'index.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + '/js/'))
                .on("end", browsersync.reload);
});

gulp.task("copy-libs", () => {
    return gulp.src("./src/libs/*")
    .pipe(gulp.dest(dist + "/libs"))
    .on("end", browsersync.reload);
});

gulp.task("scss", () => {
  return gulp.src("./src/scss/index.scss")
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    grid: true
  }))
  .pipe(cleancss(( { level: { 1: { specialComments: 0 } } } )))
  .pipe(gulp.dest(dist + 'css/'))
  .on("end", browsersync.reload);
});

gulp.task("images", () => {
  return gulp.src('./src/images/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest(dist + 'images/'))
  .on("end", browsersync.reload);
});

gulp.task("fonts", () => {
  return gulp.src('./src/fonts/*')
  .pipe(gulp.dest(dist + 'fonts/'))
  .on("end", browsersync.reload);
});

gulp.task("copy-auxiliary-js", () => {
  return gulp.src(['./src/js/*.js', '!./src/js/index.js'])
  .pipe(gulp.dest(dist + 'js/'))
  .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
		  server: "./dist/",
		  port: 4000,
      notify: false,
      browser: 'chrome'
    });
    
    gulp.watch("./src/js/*", gulp.parallel("copy-auxiliary-js"));
    gulp.watch("./src/fonts/*", gulp.parallel("fonts"));
    gulp.watch("./src/images/**/*", gulp.parallel("images"));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("scss"));
    gulp.watch("./src/index.html", gulp.parallel("minify-html"));
    gulp.watch("./src/libs/*", gulp.parallel("copy-libs"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("scss", "images", "fonts", "copy-auxiliary-js", "minify-html", "copy-libs", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/index.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'index.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + '/js/'));
});

gulp.task("default", gulp.parallel("watch", "build"));