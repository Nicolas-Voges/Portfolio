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
      this.increaseActiveIndex();
      this.turnSlidesLeft();
    }
  }

  increaseActiveIndex() {
    this.activIndex++
    if (this.activIndex >= this.translation.sliderTexts.length) {
      this.activIndex = 0;
    }
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
      this.decreaseActiveIndex();
      this.turnSlidesRight();
    }
  }

  decreaseActiveIndex() {
    this.activIndex--
    if (this.activIndex < 0) {
      this.activIndex = this.translation.sliderTexts.length - 1;
    }
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
