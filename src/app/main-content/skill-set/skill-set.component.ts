import { Component, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {
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
}