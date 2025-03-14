import { Component, inject } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  translation = inject(TranslationService)
  public translationRefs = ['location', 'mind', 'hook'];
  public aboutMeTexts: {
    name: string;
    text: string;
  }[] = [{
    name: 'location',
    text: 'Ich lebe in Wolfenbüttel, bin aber auch mobil und ebnso für Heimarbeit zu haben.'
  },
  {
    name: 'mind',
    text: 'Gern arbeite ich mich in neue und bei Ihnen benötigte Technologien ein.'
  },
  {
    name: 'hook',
    text: 'Meinen neuen Aufgaben und Herausforderungen widme ich mich stets mit großer Motivation und vollem Einsatz.'
  }];
}