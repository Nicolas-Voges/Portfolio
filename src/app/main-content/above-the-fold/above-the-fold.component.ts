import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent {
  translation = inject(TranslationService);
  public texts: string[] = [];
  toggled = false;
  textboxAnimated = true;

  constructor() {
    this.texts = this.translation.textTape;
    this.toggelAnimation();
  }

  toggelAnimation() {
    let id = setInterval(() => {
      this.textboxAnimated = false;
      if (this.toggled) {
      this.textboxAnimated = true;
      clearInterval(id);
      }
      this.toggled = true;
    }, 50);
  }

  ngOninit() {
    this.texts = this.translation.textTape;
  }
}
