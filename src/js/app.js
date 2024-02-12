document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    fixedNavigation();
    crearGaleria();
    scrollNav();
};

//Navegacion fija
function fixedNavigation() {
    const bar = document.querySelector('.header');
    const aboutFestival = document.querySelector('.about-festival');
    const body = document.querySelector('body');

    //sobre lo que vamos a escuchar que es el scroll
    window.addEventListener('scroll', function() {
        //el aboutFestival el elemento sobre el cual voy a estar revisando su posicion todo el tiempo y getBoundingClientRect()
        // console.log(aboutFestival.getBoundingClientRect()); 
        if(aboutFestival.getBoundingClientRect().bottom < 0) {
            bar.classList.add('permanent')
            body.classList.add('body-scroll')
        } else {
            bar.classList.remove('permanent')
            body.classList.remove('body-scroll')
        }
    })
};

function scrollNav() {
    const links = document.querySelectorAll('.navigation-major a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
             console.log('Section Scroll:', sectionScroll); 
            const section = document.querySelector(sectionScroll);
            console.log('Section:', section);
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        })
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.image-gallery');

   for(i = 1; i <= 12; i++) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria" />
    `;

    image.onclick = (function(id) { //Esto es una función autoejecutable (también conocida como función de cierre o función inmediata). La función se declara y se invoca inmediatamente
        return function() {
            mostrarImagen(id);
        };
    })(i); //(i): Cuando la función autoejecutable se invoca, se le pasa el valor actual de i como argumento.
    

    galeria.appendChild(image);
   }
}

function mostrarImagen(id) {
    const image = document.createElement('picture');
    image.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif" />
        <source srcset="build/img/grande/${id}.webp" type="image/webp" />
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria" />
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    };

    //BOton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    //Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body')
}
