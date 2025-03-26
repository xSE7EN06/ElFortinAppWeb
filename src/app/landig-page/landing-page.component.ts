import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos'; // Import AOS library

@Component({
  selector: 'app-landig-page',
  templateUrl: './landig-page.component.html',
  styleUrls: ['./landig-page.component.scss']
})
export class LandigPageComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
    this.initializeButtonEvents();
    this.initializeAOS();
  }

  private initializeButtonEvents(): void {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.tagName === 'BUTTON') {
        if (target.classList.contains('nav-button')) {
          this.toggleNavMenu(true);
        } else if (target.classList.contains('exit-menu')) {
          this.toggleNavMenu(false);
        } else if (target.classList.contains('to-top')) {
          this.scrollToTop();
        }
      }
    });
  }

  private toggleNavMenu(show: boolean): void {
    const navDivs = document.querySelectorAll('nav div');
    navDivs.forEach(div => {
      if (show) {
        div.classList.add('show');
      } else {
        div.classList.remove('show');
      }
    });
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  private initializeAOS(): void {
    AOS.init({
      duration: 1800,
      easing: 'ease'
    });
  }
}