// gulpfile.js
//
 'use strict'

// const gulp = require('gulp');
// const ts = require('gulp-typescript');
// const tsProject = ts.createProject('tsconfig.json');
// const rimraf = require('rimraf');

// let build_dir = './app';

// let deepclean = cb => {
//     rimraf('./node_modules', cb);
// }

// let clean = cb => rimraf(`${build_dir}/**/*`, cb);

// let transpile = () => tsProject.src()
//     .pipe(tsProject())
//     .js.pipe(gulp.dest('app'));

// let htmlassets = () => gulp.src(['./src/html/**/*'])
//     .pipe(gulp.dest('app'));


// gulp.task('dclean', deepclean);


// gulp.task('develop', gulp.series(
//     clean,
//     gulp.parallel(
//         transpile, 
//         htmlassets
//     )
// ));


const gulp = require('gulp');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
//const sourcemaps = require('gulp-sourcemaps');

let paths = {
	scripts: {
		src: 'src/**/*.ts',
		out: 'app/src'
	},
	pages: {
		src: 'src/html/*.html',
		out: 'app/src/html'
	},
	styles: {
		src: 'src/css/*.css',
		out: 'app/src/css'
	},
	imgs: {
		src: 'src/imgs/**/*',
		out: 'app/src/imgs'
	}
};

let tsProject = ts.createProject('tsconfig.json');
let compile = () => {
	return gulp.src(paths.scripts.src)
//		.pipe(sourcemaps.init())
		.pipe(tsProject())
//		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.scripts.out));
}

let watching = () => gulp.watch([paths.scripts.src,
		paths.pages.src,
		paths.styles.src], 
		parallel(compile, copyHtml, copyStyles));

let copyHtml = () =>  {
    return gulp.src([paths.pages.src])
        .pipe(gulp.dest(paths.pages.out));
}

let copyStyles = () => {
    return gulp.src(paths.styles.src)
		.pipe(gulp.dest(paths.styles.out));
}

let copyImgs= () => {
    return gulp.src(paths.imgs.src)
		.pipe(gulp.dest(paths.imgs.out));
}

let clean = cb => rimraf('app/**/*', cb);

gulp.task('clean', clean);
gulp.task('build', gulp.series(
    clean,
    compile,
    gulp.parallel(
        copyHtml,
        copyStyles,
        copyImgs
    )
));

gulp.task('dev', gulp.series(
    clean,
    gulp.parallel(
        compile,
        copyHtml,
        copyStyles,
        copyImgs
    ),
    watching
));