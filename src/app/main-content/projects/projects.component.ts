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
    linkGit: string;
    linkLive: string;
    displayCard: boolean;
  }[] = [{
    name: 'Join',
    skills: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    number: 1,
    descriptionRef: 'join',
    linkGit: 'https://github.com/Nicolas-Voges/join',
    linkLive: '',
    displayCard: false
  },
  {
    name: 'El Pollo Loco',
    skills: ['HTML', 'CSS', 'JavaScript'],
    number: 2,
    descriptionRef: 'game',
    linkGit: 'https://github.com/Nicolas-Voges/el-pollo-loco',
    linkLive: '',
    displayCard: false
  },
  {
    name: 'DA Bubble',
    skills: ['Angular', 'Firebase', 'TypeScript'],
    number: 3,
    descriptionRef: 'bubble',
    linkGit: '',
    linkLive: '',
    displayCard: false
  }];

  openProjectCard(i: number) {
    this.scrollToTopCard();
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
    this.scrollToTopCard();
  }

  scrollToTopCard() {
    let id = setTimeout(() => {
      let boxes = document.getElementsByClassName('scroll-child');
      for (let i = 0; i < boxes.length; i++) {
        const element = boxes[i];
        element.scrollIntoView({ behavior: "instant", block: "start" });
      }
      clearTimeout(id);
    }, 5);
  }
}
