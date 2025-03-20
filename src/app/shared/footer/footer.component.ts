import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../translation.service';
import { ScrollService } from '../scroll.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  translation = inject(TranslationService);
  scrollService = inject(ScrollService);

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      let id = setTimeout(() => {
        if (fragment) this.scrollService.jumpToSection(fragment);
        clearTimeout(id);
      }, 10);
    });
  }
}
