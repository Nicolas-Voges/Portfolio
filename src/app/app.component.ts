import { Component, HostListener, ViewChild, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ScrollService } from './shared/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  lastScrollY = 0;
  hideHeader = false;
  highContrast = false;
  scrollService = inject(ScrollService);
  @ViewChild('mouseShadow') mouseShadow?: ElementRef;
  mobileDivice = navigator.maxTouchPoints > 0 && /Android|RIM Tablet|iPhone|HUAWEI|huawei|phone/i.test(navigator.userAgent);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      if (fragment) this.jumpToSection(fragment);
    });
  }

  jumpToSection(section: string | null) {
    if (section) document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (this.lastScrollY > window.scrollY) {
      this.lastScrollY = window.scrollY;
      this.hideHeader = false;
    } else {
      this.lastScrollY = window.scrollY;
      this.hideHeader = true;
    }
    if (window.scrollY < 100) {
      this.highContrast = false;
    } else {
      this.highContrast = true;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseShadow?.nativeElement.setAttribute('style', `top: ${event.clientY}px; left: ${event.clientX}px`);
  }
}
