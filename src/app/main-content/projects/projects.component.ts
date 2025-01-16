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
    number: number;
    description: string;
    displayCard: boolean;
  }[] = [{
    name: 'Join',
    skills: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    number: 1,
    description: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories',
    displayCard: false
  },
  {
    name: 'El Pollo Loco',
    skills: ['HTML', 'CSS', 'JavaScript'],
    number: 2,
    description: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
    displayCard: false
  },
  {
    name: 'DA Bubble',
    skills: ['Angular', 'Firebase', 'TypeScript'],
    number: 3,
    description: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
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
