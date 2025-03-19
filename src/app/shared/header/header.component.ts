import { Component, HostListener, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../translation.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  started = false;
  showMenu = true;
  bigScreen = true;
  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('menuToggle') menuToggle?: ElementRef;

  constructor(private scroller: ViewportScroller, private router: Router, private activatedRoute: ActivatedRoute) {
    this.checkMenuStatus();
  }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
    let id = setTimeout(() => {
      this.started = true;

      clearTimeout(id);
    }, 2000);
  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  // navigateTo(component: string) {
  //   this.router.navigate(["/"], { fragment: component });
  //   // this.scroller.scrollToAnchor(component);
  // }

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
