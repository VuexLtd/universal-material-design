const gulp = require('gulp');
const ts = require('gulp-typescript');
const runSequence = require('run-sequence');
const jsonTransform = require('gulp-json-transform');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

let version = require('./package.json').version;
const dests = {
    main: './dist',
    core: './dist/core',
    preact: './dist/preact',
    angular: './dist/angular',
};

gulp.task('default', done => {
    runSequence(
        'clean',
        'core',
        [
            'preact',
            'angular',
        ],
        done
    );
});

gulp.task('clean', () => {
    return del([
        './dist',
    ]);
});


/**
 * Core
 */

gulp.task('core', done => {
    runSequence(
        ':core:clean',
        [
            ':core:ts',
            ':core:styles',
            ':core:copy',
            ':core:package.json',
        ],
        done
    );
});

const coreProject = ts.createProject('./core/tsconfig.json');
gulp.task(':core:ts', () => {
    return coreProject.src()
        .pipe(coreProject())
        .pipe(gulp.dest(dests.core));
});

gulp.task(':core:clean', () => {
    return del(['./dist/core']);
});

gulp.task(':core:styles', () => {
    return gulp.src('./core/styles/styles.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest(dests.core))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dests.core));
});

gulp.task(':core:copy', () => {
    return gulp.src(['./core/styles/**/*.scss', './core/README.md'])
        .pipe(gulp.dest(dests.core));
});

gulp.task(':core:package.json', () => {
    return gulp.src(['./core/package.json'])
        .pipe(jsonTransform(data => {
            return Object.assign({}, data, {
                version: version,
                devDependencies: undefined,
                scripts: undefined,
            });
        }, 2))
        .pipe(gulp.dest(dests.core));
});


/**
 * Preact
 */

gulp.task('preact', done => {
    runSequence(
        ':preact:clean',
        [
            ':preact:ts',
            ':preact:copy',
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

gulp.task(':preact:clean', () => {
    return del(['./dist/preact']);
});

gulp.task(':preact:copy', () => {
    return gulp.src(['./preact/README.md'])
        .pipe(gulp.dest(dests.preact));
});

gulp.task(':preact:package.json', () => {
    return gulp.src(['./preact/package.json'])
        .pipe(jsonTransform(data => {
            return Object.assign({}, data, {
                version: version,
                devDependencies: undefined,
                scripts: undefined,
                dependencies: Object.assign({}, data.dependencies, {
                    "@material-design/core": version,
                }),
            });
        }, 2))
        .pipe(gulp.dest(dests.preact));
});


/**
 * Angular
 */

gulp.task('angular', done => {
    runSequence(
        ':angular:clean',
        [
            ':angular:copy',
            ':angular:package.json',
        ],
        done
    );
});

gulp.task(':angular:clean', () => {
    return del(['./dist/angular']);
});

gulp.task(':angular:copy', () => {
    return gulp.src(['./angular/README.md'])
        .pipe(gulp.dest(dests.angular));
});

gulp.task(':angular:package.json', () => {
    return gulp.src(['./angular/package.json'])
        .pipe(jsonTransform(data => {
            return Object.assign({}, data, {
                version: version,
                devDependencies: undefined,
                scripts: undefined,
                dependencies: Object.assign({}, data.dependencies, {
                    "@material-design/core": version,
                }),
            });
        }, 2))
        .pipe(gulp.dest(dests.angular));
});
