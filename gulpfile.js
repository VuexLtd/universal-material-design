const gulp = require('gulp');
const ts = require('gulp-typescript');
const runSequence = require('run-sequence');
const jsonTransform = require('gulp-json-transform');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

// TODO: populate
let version = '0.5.1';
const dests = {
    main: './dist',
    preact: './dist/preact',
};

gulp.task('default', done => {
    runSequence(
        'clean',
        'styles',
        [
            'preact',
        ],
        done
    );
});

gulp.task('clean', () => {
    return del([
        './dist',
    ]);
});

gulp.task('styles', () => {
    return gulp.src('./styles/styles.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(rename('umd.css'))
        .pipe(gulp.dest(dests.main))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dests.main));
});

gulp.task('preact', done => {
    runSequence(
        [
            ':preact:ts',
            ':preact:copy',
            ':preact:styles',
            ':preact:package.json',
        ],
        done
    );
});

const preactProject = ts.createProject('./preact/tsconfig.json');
gulp.task(':preact:ts', () => {
    return preactProject.src()
        .pipe(preactProject())
        .pipe(gulp.dest(dests.preact));
});

gulp.task(':preact:copy', () => {
    return gulp.src(['./styles/**/*.scss', './preact/README.md'])
        .pipe(gulp.dest(dests.preact));
});

gulp.task(':preact:styles', () => {
    return gulp.src(['./dist/umd.css', './dist/umd.min.css'])
        .pipe(rename(p => {
            p.basename = p.basename.includes('min') ? 'styles.min' : 'styles'
        }))
        .pipe(gulp.dest(dests.preact));
});

gulp.task(':preact:package.json', () => {
    return gulp.src(['./preact/package.json'])
        .pipe(jsonTransform(data => {
            return Object.assign({}, data, {
                version: version,
                devDependencies: undefined,
                scripts: undefined,
            });
        }, 2))
        .pipe(gulp.dest(dests.preact));
});
