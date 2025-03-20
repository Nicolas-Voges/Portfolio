import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollService } from '../../shared/scroll.service';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent implements OnInit {
  translation = inject(TranslationService);
  public skills: string[] = [
    'HTML',
    'CSS',
    'JavaScript',
    'Material Design',
    'TypeScript',
    'Angular',
    'Firebase',
    'GIT',
    'Rest-Api',
    'Scrum',
    'Growth mindset'
  ];

  public interests: string[] = [
    'React',
    'Vue Js'
  ];

  constructor(private activatedRoute: ActivatedRoute) { }

  scrollService = inject(ScrollService);

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment: string | null) => {
      let id = setTimeout(() => {
        if (fragment) this.scrollService.jumpToSection(fragment);
        clearTimeout(id);
      }, 10);
    });
  }
}