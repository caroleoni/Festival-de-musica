function iniciarApp(){fixedNavigation(),crearGaleria(),scrollNav()}function fixedNavigation(){const e=document.querySelector(".header"),t=document.querySelector(".about-festival"),n=document.querySelector("body");window.addEventListener("scroll",(function(){t.getBoundingClientRect().bottom<0?(e.classList.add("permanent"),n.classList.add("body-scroll")):(e.classList.remove("permanent"),n.classList.remove("body-scroll"))}))}function scrollNav(){document.querySelectorAll(".navigation-major a").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault();const t=e.target.attributes.href.value;console.log("Section Scroll:",t);const n=document.querySelector(t);console.log("Section:",n),n.scrollIntoView({behavior:"smooth",block:"start"})}))})}function crearGaleria(){const e=document.querySelector(".image-gallery");for(i=1;i<=12;i++){const t=document.createElement("picture");t.innerHTML=`\n        <source srcset="build/img/thumb/${i}.avif" type="image/avif" />\n        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />\n        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria" />\n    `,t.onclick=function(e){return function(){mostrarImagen(e)}}(i),e.appendChild(t)}}function mostrarImagen(e){const t=document.createElement("picture");t.innerHTML=`\n        <source srcset="build/img/grande/${e}.avif" type="image/avif" />\n        <source srcset="build/img/grande/${e}.webp" type="image/webp" />\n        <img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg" alt="imagen galeria" />\n    `;const n=document.createElement("DIV");n.appendChild(t),n.classList.add("overlay"),n.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()};const o=document.createElement("P");o.textContent="X",o.classList.add("btn-cerrar"),o.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),n.remove()},n.appendChild(o);const i=document.querySelector("body");i.appendChild(n),i.classList.add("fijar-body")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map