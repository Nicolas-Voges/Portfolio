import { Component, HostListener, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../translation.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  showMenu = true;
  bigScreen = true;
  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('menuToggle') menuToggle?: ElementRef;
  scrollService = inject(ScrollService);

  constructor(private activatedRoute: ActivatedRoute) {
    this.checkMenuStatus();
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      let id = setTimeout(() => {
        if (fragment) this.scrollService.jumpToSection(fragment);
        if (window.innerWidth <= 750) this.showMenu = false;
        clearTimeout(id);
      }, 10);
    });
  }

  translation = inject(TranslationService);

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

  closeMenu() {
    if (window.innerWidth <= 750) this.showMenu = false;
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
    // window.scrollTo({ top: 9999, left: 0, behavior: "instant" }); // styling footer
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
