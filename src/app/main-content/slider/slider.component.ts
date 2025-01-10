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
    public animateLeftClasses: string[] = ['move-out-from-left', 'move-left-from-center', 'move-left-from-right'];
    public animateRightClasses: string[] = ['move-right-from-left', 'move-right-from-center', 'move-out-from-right'];
    public animateLeft = true;
    public animateRight = false;

  decreaseActiveIndex() {
    this.activIndex--
    if (this.activIndex < 0) {
      this.activIndex = this.slides.length - 1;
    }
    this.animateLeft = true;
    console.log(this.animateLeft);    
    let id = setTimeout( () => {
      let obj: {
        text: string;
        link?: string;
      } | undefined = this.slides.pop();
      if (obj != undefined) {
        this.slides.unshift(obj);
      }
    this.animateLeft = false;
    clearTimeout(id);
    }, 1000);
  }

  increaseActiveIndex() {
    this.activIndex++
    if (this.activIndex >= this.slides.length) {
      this.activIndex = 0;
    }
    let obj: {
      text: string;
      link?: string;
    } | undefined = this.slides.shift();
    if (obj != undefined) {
      this.slides.push(obj);
    }
  }
}
