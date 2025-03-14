import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  translation = inject(TranslationService);
  public projects: {
    name: string;
    skills: string[];
    number: number;
    descriptionRef: string;
    displayCard: boolean;
  }[] = [{
    name: 'Join',
    skills: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    number: 1,
    descriptionRef: 'join',
    displayCard: false
  },
  {
    name: 'El Pollo Loco',
    skills: ['HTML', 'CSS', 'JavaScript'],
    number: 2,
    descriptionRef: 'game',
    displayCard: false
  },
  {
    name: 'DA Bubble',
    skills: ['Angular', 'Firebase', 'TypeScript'],
    number: 3,
    descriptionRef: 'bubble',
    displayCard: false
  }];

  openProjectCard(i: number) {
    this.projects[i].displayCard = true;
  }

  closeProjectCard(i: number) {
    this.projects[i].displayCard = false;
  }

  showNextProject(i: number) {
    this.closeProjectCard(i);
    if (i >= this.projects.length - 1) {
      this.openProjectCard(0);
    } else {
      i++;
      this.openProjectCard(i);
    }
  }
}
