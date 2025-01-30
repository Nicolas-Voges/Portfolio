import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  showMenu = true;
  bigScreen = true;
  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('menuToggle') menuToggle?: ElementRef;

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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.menuIsClicked(event) || this.menuBtnIsClicked(event)) {
      return;
    } else if (window.innerWidth <= 750 && this.showMenu) {
      this.showMenu = false;
    }
  }

  menuIsClicked(event: MouseEvent): boolean {
    return this.menu && this.menu.nativeElement.contains(event.target);
  }

  menuBtnIsClicked(event: MouseEvent): boolean {
    return this.menuToggle && this.menuToggle.nativeElement.contains(event.target);
  }
}
