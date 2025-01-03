import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public projects: {
    name: string;
    skills: string[];
  }[] = [{
    name: 'Join',
    skills: ['HTML', 'CSS', 'JavaScript', 'Firabase']
  },
  {
    name: 'El Pollo Loco',
    skills: ['HTML', 'CSS', 'JavaScript']
  },
  {
    name: 'DA Bubble',
    skills: ['Angular', 'Firebase', 'TypeScript']
  }];
}
