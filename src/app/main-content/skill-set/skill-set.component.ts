import { Component } from '@angular/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {
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
