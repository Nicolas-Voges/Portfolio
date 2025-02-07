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

  constructor() {
    // this.texts = [
    //     'Open to work',
    //     'Also available for remote work',
    //     'Frontend Developer',
    //     'Based in Wolfenbüttel',
    //     'Aspiring Full Stack Developer',
    //     'Open to work',
    //     'Also available for remote work',
    //     'Frontend Developer',
    //     'Based in Wolfenbüttel',
    //     'Aspiring Full Stack Developer'
    //   ];
    this.texts = this.translation.textTape;
    console.log(this.texts);
    console.log('this.texts');
  }

  ngOninit() {
    this.texts = this.translation.textTape;
    
  }
}
