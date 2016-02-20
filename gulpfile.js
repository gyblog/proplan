var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var nodemon = require('gulp-nodemon');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

gulp.task('clean', function(callback){
  return destDir.dirAsync('.', {empty: true});
});

gulp.task('copy', function(){
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true,
    matching: [
      '*.html',
      './components/**/*.html'
    ]
  });
});

gulp.task('build', ['copy'], function(){
  return gulp.src('./app/index.html')
    .pipe(usemin({app:[uglify()], css:[cssmin()]}))
    .pipe(gulp.dest('build/'));
});

gulp.task('sync', ['nodemon'], function(){
  browserSync.init(null, {
    proxy: "http://localhost:5000",
    files: ['**/*.*'],
    browser: "chrome",
    port: "7002"
  });
});

gulp.task('nodemon', ['build'], function(cb){
  var started = false;
  return nodemon({
    script: './server/index.js'
  }).on('start', function() {
    if(!started){
      cb();
      started = true;
    }
  })
});

gulp.task('run', ['sync'], function(){
  gulp.watch('./app/**/*.*', ['build', reload]);
});