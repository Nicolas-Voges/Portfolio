import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showMenu = true;
  bigScreen = true;

  constructor() {
    this.checkMenuStatus();
  }

  private checkMenuStatus() {
    if (window.innerWidth > 750) {
      this.showMenu = true;
      this.bigScreen = true;
    } else if (this.showMenu && !this.bigScreen) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
      this.bigScreen = false;
    }
  }

  toggleMenu() {
    if (this.showMenu) {
      this.showMenu = false;
    } else {
      this.showMenu = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkMenuStatus();
  }
}
