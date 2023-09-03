const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprifixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const include = require('gulp-include');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svg = require('gulp-svg-sprite');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const htmlMin = require('gulp-htmlmin');

let prod = false;
function isProd(done) {
    prod = true;
    done();
};

function htmlPage() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(gulpif(prod, src('app/*.html')))
        .pipe(gulpif(prod, htmlMin({
            collapseWhitespace: true,
          })))
        .pipe(gulpif(prod, (dest('dist'))))
        .pipe(browserSync.stream())
};

function styles() {
    return src('app/scss/style.scss')
        .pipe(gulpif(!prod, sourcemaps.init()))        
        .pipe(autoprifixer({
            overrideBrowsersList: ['last 5 version']
        }))
        .pipe(concat('style.min.css'))
        .pipe(scss())
        .pipe(gulpif(prod, scss({outputStyle: 'compressed'})))
        .pipe(gulpif(!prod, sourcemaps.write()))
        .pipe(dest('app/css'))
        .pipe(gulpif(prod, (dest('dist/css'))))
        .pipe(browserSync.stream())
}

function scripts() {
    return src('app/js/*.js')
        .pipe(gulpif(!prod, sourcemaps.init()))
        //.pipe(concat('main.min.js'))
        .pipe(gulpif(prod, uglify()))
        .pipe(gulpif(!prod, sourcemaps.write()))
        //.pipe(dest('app/js'))
        .pipe(gulpif(prod, (dest('dist/js'))))    
        .pipe(browserSync.stream())            
};

function libs() {
    return src(['node_modules/swiper/swiper-bundle.js',
        'node_modules/choices.js/public/assets/scripts/choices.js',
        'node_modules/just-validate/dist/just-validate.production.min.js',
        'node_modules/inputmask/dist/inputmask.js',
        'node_modules/nouislider/dist/nouislider.mjs'])
        .pipe(dest('app/libs'))
        .pipe(gulpif(prod, (dest('dist/libs'))))    
        .pipe(browserSync.stream())     
};

function images() {
    return src([
        'app/images/src/**/*.*',
        '!app/images/src/**/*.svg'
        ])
        .pipe(newer('app/images'))
        .pipe(avif({ quality: 50}))

        .pipe(src('app/images/src/**/*.*'))
        .pipe(webp())

        .pipe(src('app/images/src/**/*.*'))
        .pipe(imagemin())
        .pipe(dest('app/images'))
        .pipe(dest('dist/images')) 
        .pipe(browserSync.stream()) 

}

function svgSprite() {
    return src('app/images/dist/**/*.svg')
        .pipe(svg({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images/dist'))
        .pipe(gulpif(prod, (dest('dist/images'))))    
        .pipe(browserSync.stream()) 
};

function fonts() {
    return src('app/fonts/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
        .pipe(gulpif(prod, (dest('dist/fonts'))))    
        .pipe(browserSync.stream())   
};

function watching() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });

    watch(['app/components/*', 'app/pages/*'], htmlPage);
    watch(['app/scss/*.scss'], styles);
    watch(['app/js/*.js'], scripts); 
    watch(['app/images/src'], images);
    watch(['app/**/*.html']).on('change', browserSync.reload);   
};

function cleanDist() {
    return src('dist')
        .pipe(clean())
};

exports.htmlPage = htmlPage;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.svgSprite = svgSprite;
exports.fonts = fonts;
exports.watching = watching;
exports.clean = cleanDist;
exports.libs = libs;

exports.dev = parallel(htmlPage, styles, scripts, images, fonts, libs, watching);
exports.build = series(isProd, cleanDist, htmlPage, styles, scripts, images, fonts, libs );