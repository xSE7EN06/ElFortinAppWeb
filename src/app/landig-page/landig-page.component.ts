import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-landig-page',
  templateUrl: './landig-page.component.html',
  styleUrls: ['./landig-page.component.css'] // Se importa el CSS aquí
})
export class LandigPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupSmoothScroll(); // Configura el desplazamiento suave al inicializar el componente
  }

  // Función para mantener el header fijo al hacer scroll
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = document.getElementById('header');
    if (header) {
      const sticky = header.offsetTop;
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }

  // Función para configurar el desplazamiento suave
  setupSmoothScroll() {
    // Desplazarse al principio de la página
    const inicioLink = document.querySelector('a[href="#inicio"]');
    if (inicioLink) {
      inicioLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Desplazarse a la sección de promociones
    const promocionesLink = document.querySelector('a[href="#promociones"]');
    if (promocionesLink) {
      promocionesLink.addEventListener('click', (e) => {
        e.preventDefault();
        const promocionesSection = document.getElementById('promociones');
        if (promocionesSection) {
          promocionesSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Desplazarse a la sección de acerca de nosotros
    const acercaLink = document.querySelector('a[href="#acerca-de-nosotros"]');
    if (acercaLink) {
      acercaLink.addEventListener('click', (e) => {
        e.preventDefault();
        const acercaSection = document.getElementById('acerca-de-nosotros');
        if (acercaSection) {
          acercaSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
}