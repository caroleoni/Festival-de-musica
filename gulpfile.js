//es una herramienta para automatizar tareas. esas tareas son funciones js
const { src, dest, watch, parallel } = require("gulp"); 
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
//estos tres juntos mejoran mucho el css
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
//te dice en la consola del navegador en que archivo se encuentra ese css que quieres modificar
const sourcemaps = require("gulp-sourcemaps");

//IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//Javascript
const terser = require("gulp-terser-js"); //mejora el codigo de js

function css(done) {
    //Identificar el archivo de SASS (src) -> src('./src/scss/app.scss')
    //gulp tiene una api que utiliza algo llamado: pipe()//se dice: paip: es como una accion que se realiza despues de otra
    //Compilarlo || Procesa  -> .pipe(sass())
    //Almacenarla en el disco duro || guardarla -> .pipe(dest("build/css"))

    src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"))

    done(); //Callback que avisa a Gulp cuando llegamos al final
};

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3 //esto va a mejorar las imagenes en un optimizacion de 3, ligerar un poco
    }
    src('src/img/**/*.{jpg,png}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))

    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))

    done();
};

function versionAvif(done) {
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{jpg,png}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))

    done();
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);