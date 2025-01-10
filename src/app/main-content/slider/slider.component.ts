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
    
  public animateLeft = false;
  public animateRight = false;

  increaseActiveIndex() {
    if (!this.animateLeft) {
      this.animateLeft = true;
      this.activIndex++
      if (this.activIndex >= this.slides.length) {
        this.activIndex = 0;
      }
      console.log(this.animateLeft);
      let id = setTimeout(() => {
        let obj: {
          text: string;
          link?: string;
        } | undefined = this.slides.shift(); //pop
        if (obj != undefined) {
          this.slides.push(obj);  //unshift
        }
        this.animateLeft = false;
        clearTimeout(id);
      }, 1000);
    }
  }

  decreaseActiveIndex() {
    if (!this.animateRight) {
      this.animateRight = true;
      this.activIndex--
      if (this.activIndex < 0) {
        this.activIndex = this.slides.length - 1;
      }
      let id = setTimeout(() => {
        let obj: {
          text: string;
          link?: string;
        } | undefined = this.slides.pop();
        if (obj != undefined) {
          this.slides.unshift(obj);
        }
        this.animateRight = false;
        clearTimeout(id);
      }, 1000);
    }
  }
}
