var del = require('del');
var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function(done) {
  del(['css'], done);
});

gulp.task('watch', ['clean', 'build'], function() {
  gulp.watch('less/**/*.less', ['build']);
});

gulp.task('build', ['clean'], function() {
  return gulp.src('less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'));
});
