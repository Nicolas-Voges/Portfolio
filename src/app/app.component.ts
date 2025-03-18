import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  lastScrollY = 0;
  hideHeader = false;
  highContrast = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.lastScrollY > window.scrollY) {
      this.lastScrollY = window.scrollY;
      this.hideHeader = false;
    } else {
      this.lastScrollY = window.scrollY;
      this.hideHeader = true;
    }
    if (window.scrollY <= 200) {
      this.highContrast = false;
    } else {
      this.highContrast = true;
    }
  }
}
