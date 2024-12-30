import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  public aboutMeTexts: {
    name: string;
    text: string;
  }[] = [{
    name: 'location',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsum quisquam iusto accusamus dolores tenetur quis corrupti, simil'
  },
  {
    name: 'mind',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsum quisquam iusto accusamus dolores tenetur quis corrupti, simil'
  },
  {
    name: 'hook',
    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore ipsum quisquam iusto accusamus dolores tenetur quis corrupti, simil'
  }];
}
