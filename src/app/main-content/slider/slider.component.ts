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
  public dotIndex: number = 0;
  public animateLeft = false;
  public animateRight = false;

  getSlidesIndex(): number {
    if (this.translation.sliderTexts.length <= 3) {
      return 0;
    } else {
      return 3;
    }
  }

  leftAnimation() {
    if (!this.animateLeft && !this.animateRight) {
      this.animateLeft = true;
      this.activIndex = this.increaseIndex(this.activIndex, this.translation.sliderTexts);
      this.dotIndex = this.increaseIndex(this.dotIndex, this.translation.sliderTexts);
      this.turnSlidesLeft();
    }
  }

  increaseIndex(i: number, arr: any[]): number {
    i++;
    if (i >= arr.length) {
      i = 0;
    }
    return i;
  }

  turnSlidesLeft() {
    let id = setTimeout(() => {
      let arr = this.translation.sliderTexts.shift();
      let arrH = this.translation.sliderHeadlines.shift();
      if (arr != undefined && arrH != undefined ) {
        this.translation.sliderTexts.push(arr);
        this.translation.sliderHeadlines.push(arrH);
      }
      this.animateLeft = false;
      clearTimeout(id);
    }, 975);
  }

  rightAnimation() {
    if (!this.animateLeft && !this.animateRight) {
      this.animateRight = true;
      this.activIndex = this.decreaseIndex(this.activIndex, this.translation.sliderTexts);
      this.dotIndex = this.decreaseIndex(this.dotIndex, this.translation.sliderTexts);
      this.turnSlidesRight();
    }
  }

  decreaseIndex(i: number, arr: any[]): number {
    i--;
    if (i < 0) {
      i = arr.length - 1;
    }
    return i;
  }

  turnSlidesRight() {
    let id = setTimeout(() => {
      let arr = this.translation.sliderTexts.pop();
      let arrH = this.translation.sliderHeadlines.pop();
      if (arr != undefined && arrH != undefined ) {
        this.translation.sliderTexts.unshift(arr);
        this.translation.sliderHeadlines.unshift(arrH);
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
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
