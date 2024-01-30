//es una herramienta para automatizar tareas. esas tareas son funciones js
const { src, dest, watch, parallel } = require("gulp"); 
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//IMAGENES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
    //Identificar el archivo de SASS (src) -> src('./src/scss/app.scss')
    //gulp tiene una api que utiliza algo llamado: pipe()//se dice: paip: es como una accion que se realiza despues de otra
    //Compilarlo || Procesa  -> .pipe(sass())
    //Almacenarla en el disco duro || guardarla -> .pipe(dest("build/css"))

    src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest("build/css"));

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

function dev(done) {
    watch('./src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);