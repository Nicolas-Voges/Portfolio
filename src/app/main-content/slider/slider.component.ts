import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  public activIndex: number = 1;
  public slides: {
    text: string;
    link?: string;
  }[] = [
      {
        text: 'calc',
        link: '',
      },
      {
        text: 'snake',
        link: '',
      },
      {
        text: 'poke',
        link: '',
      }
    ];
}
