//JavaScript
import gulp from 'gulp'
import babel from 'gulp-babel'
import terser from 'gulp-terser'

gulp.task('babel', () => {
  return gulp
    .src('./src/js/*.js')
    // .pipe(concat('scripts-min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./public/js'))
})

gulp.task('default', () => {
  gulp.watch('./src/js/*.js', gulp.series('babel'))
})