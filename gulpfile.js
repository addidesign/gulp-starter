
// -----------------------------------------------------
// Project Variables
// -----------------------------------------------------

// Styles
var style_dest = 'assets/css/';

// Scripts
var scripts_src = 'assets/js/*.js',
    scripts_dest = 'assets/js/min/',
    scripts_vendor = 'node_modules',
    scripts_file = 'scripts.js';

// Images
var images_src = 'assets/img/*',
    images_dest = 'assets/img/';

// Watch
var style_watch = 'assets/sass/**/*.scss',
    scripts_watch = 'assets/js/*.js',
    html_watch = '*.html';

// Autoprefixer
// Browserlist https://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

// -----------------------------------------------------
// Gulp Plugins
// -----------------------------------------------------

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-cssnano'); // Minifies CSS files.
	autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    bs = require('browser-sync'),
    reload = bs.reload,
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    size = require('gulp-size'),
    rename = require('gulp-rename');


// -----------------------------------------------------
// Default Task
// -----------------------------------------------------
// This task runs everytime you run 'gulp' in terminal
gulp.task('default', ['browser-sync', 'watch']);



// -----------------------------------------------------
// BrowserSync
// -----------------------------------------------------
// Prepare Browser-sync
gulp.task('browser-sync', function() {
    bs.init({
		server: {
		    baseDir: "./",
		    serveStaticOptions: {
		        extensions: ["html"]
		    }
		},
        port: 3000, // If you run 'gulp' and the page just times out try changing this to a different port
        injectChanges: true
    });

});

// Reload browser - runs on the watch task
gulp.task('reload', function() {
    bs.reload();
});

// -----------------------------------------------------
// Styles
// -----------------------------------------------------

// Compile sass
gulp.task('minify-css', function() {
    gulp.src(style_watch)
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed',
            precision: 10
        }))
        .on('error', reportStyleError)
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(rename({
            suffix: '.min'
        })) // rename the file with .min
        .pipe(minifycss()) // minify the file
        .pipe(gulp.dest(style_dest + '/min')) // move minified css file to folder

        .pipe(size({
            gzip: true
        })) // get file size (gzipped)

        .pipe(bs.stream()) // BrowserSync inject styles

        .pipe(notify({
            message: 'CSS & SASS Compiled'
        }))
});

// Style Error
var reportStyleError = function(error) {
    notify({
        title: '!!ERROR: Gulp SASS Error!',
        message: 'Please check your terminal'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}


// -----------------------------------------------------
// Scripts
// -----------------------------------------------------

// Concatenate js files and minify
gulp.task('minify-js', function() {
    gulp.src([
            // Add JS files in order
            scripts_vendor + '/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
            scripts_src
        ])
        .pipe(concat(scripts_file)) // Concatenate all the scripts
        .pipe(uglify()) // minify the file
        .on('error', reportScriptError)
        .pipe(rename({
            suffix: '.min'
        })) // rename the file with .min
        .pipe(gulp.dest(scripts_dest)) // move js file to folder
        .pipe(bs.stream()) // inject scripts
        .pipe(notify({
            message: 'JS Minified'
        })) // notify to say the task has complete

});

// Script Error
var reportScriptError = function(error) {
    notify({
        title: 'Gulp JS Error!',
        message: 'Please check your terminal',
        wait: true
    }).write(error);

    console.log(error.message);

    this.emit('end');
}

// -----------------------------------------------------
// Images
// -----------------------------------------------------
gulp.task('minfy-images', function() {
    gulp.src(images_src)
        .pipe(imagemin())
        .pipe(gulp.dest(images_dest))
});

// -----------------------------------------------------
// Watch
// -----------------------------------------------------

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch(style_watch, ['minify-css']);
    gulp.watch(scripts_watch, ['minify-js']);
    gulp.watch(images_src, ['minfy-images']);
    // Cache assets after initial compile tasks
    gulp.watch(style_dest + '/min/main.min.css');
    gulp.watch(scripts_dest + '*.js');
    // Watch all other files and reload browser
    gulp.watch(html_watch, ['reload']);
});
