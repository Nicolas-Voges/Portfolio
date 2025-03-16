import { Component, inject } from '@angular/core';
import { TranslationService } from '../../shared/translation.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import AOS from 'aos';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  translation = inject(TranslationService);
  public activIndex: number = 1;
  public slides;
  public headlines;

  public animateLeft = false;
  public animateRight = false;
  
  constructor() {
    this.slides = this.translation.sliderTexts;
    this.headlines = this.translation.sliderHeadlines;
    console.log(this.slides);
    console.log(this.headlines);
    
  }

  getSlidesIndex(): number {
    if (this.slides.length <= 3) {
      return 0;
    } else {
      return 3;
    }
  }

  leftAnimation() {
    if (!this.animateLeft && !this.animateRight) {
      this.animateLeft = true;
      this.increaseActiveIndex();
      this.turnSlidesLeft();
    }
  }

  increaseActiveIndex() {
    this.activIndex++
    if (this.activIndex >= this.slides.length) {
      this.activIndex = 0;
    }
  }

  turnSlidesLeft() {
    let id = setTimeout(() => {
      let arr = this.slides.shift();
      let arrH = this.headlines.shift();
      if (arr != undefined && arrH != undefined ) {
        this.slides.push(arr);
        this.headlines.push(arrH);
      }
      this.animateLeft = false;
      clearTimeout(id);
    }, 975);
  }

  rightAnimation() {
    if (!this.animateLeft && !this.animateRight) {
      this.animateRight = true;
      this.decreaseActiveIndex();
      this.turnSlidesRight();
    }
  }

  decreaseActiveIndex() {
    this.activIndex--
    if (this.activIndex < 0) {
      this.activIndex = this.slides.length - 1;
    }
  }

  turnSlidesRight() {
    let id = setTimeout(() => {
      let arr = this.slides.pop();
      let arrH = this.headlines.pop();
      if (arr != undefined && arrH != undefined ) {
        this.slides.unshift(arr);
        this.headlines.unshift(arrH);
      }
      this.animateRight = false;
      clearTimeout(id);
    }, 975);
  }

  chooseAction(i: number) {
    switch (i >= 0 && i <= 2) {
      case i === 0:
        this.rightAnimation();
        break;
      case i === 2:
        this.leftAnimation();
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      delay: 100,
    });    
  //   this.slides = [
  //     {
  //       text: this.translation.sliderTexts[2],
  //       // link: '',
  //     },
  //     {
  //       text: this.translation.sliderTexts[0],
  //       // link: '',
  //     },
  //     {
  //       text: this.translation.sliderTexts[1],
  //       // link: '',
  //     }
  //   ];
  // console.log(this.translation.sliderTexts);
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
