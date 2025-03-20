import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
import AOS from 'aos';
import { ScrollService } from '../../shared/scroll.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent implements OnInit {
  translation = inject(TranslationService);
  public texts: string[] = [];
  toggled = false;
  textboxAnimated = true;
  scrollService = inject(ScrollService);

  constructor(private activatedRoute: ActivatedRoute) {
    this.texts = this.translation.textTape;
    this.toggelAnimation();
  }

  toggelAnimation() {
    let id = setInterval(() => {
      this.textboxAnimated = false;
      if (this.toggled) {
        this.textboxAnimated = true;
        clearInterval(id);
      }
      this.toggled = true;
    }, 50);
  }

  ngOnInit() {
    this.texts = this.translation.textTape;
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      let id = setTimeout(() => {
        if (fragment) this.scrollService.jumpToSection(fragment);
        clearTimeout(id);
      }, 10);
    });
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      delay: 100,
    });
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
