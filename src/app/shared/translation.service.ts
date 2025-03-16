import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';

import { Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  de = true;
  public textTape: string[] = [];
  public formPlaceholder: string[] = [];
  public sliderTexts: string[] = [];
  public sliderHeadlines: string[] = [];
  texts = {
    'text-tape': ["remote", "next", "location", "dev", "open-to-work"],
    'form': ["name", "email", "message"],
    'slider': ['future', 'snake', 'DA']
  };
  // sliderTexts = ['slider.snake.text', 'slider.DA.text', 'slider.futur.text'];
  doubled = false;

  private subscriptionTextTape: Subscription;
  private subscriptionForm: Subscription;
  private subscriptionSlider: Subscription;
  private subscriptionSliderHeadlines: Subscription;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use(this.translate.getBrowserLang() || "de");
    this.subscriptionTextTape = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => { });
    this.subscriptionForm = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => { });
    this.subscriptionSlider = translate.stream(_(`slider.`)).subscribe((text: string) => { });
    this.subscriptionSliderHeadlines = translate.stream(_(`slider.`)).subscribe((text: string) => { });
    this.useLanguage();
  }

  changeLanguage() {
    if (this.de) {
      this.de = false;
    } else {
      this.de = true;
    }
    this.useLanguage();
  }

  useLanguage(): void {
    if (this.de) {
      this.translate.use('de');
      this.updateTexts();
    } else {
      this.translate.use('en');
      this.updateTexts();
    }
  }

  updateTexts() {
    this.textTape = [];
    this.formPlaceholder = [];
    this.sliderTexts = [];
    this.sliderHeadlines = [];
    this.fillTexts();
  }

  fillTexts() {
    for (let i = 0; i < this.texts['text-tape'].length; i++) {
      this.subscriptionTextTape = this.translate.stream(_(`atf.text-tape.${this.texts['text-tape'][i]}`)).subscribe((text: string) => {
        if (this.textTape.length < this.texts['text-tape'].length) {
          this.textTape.push(text);
        }
      });
    }

    for (let i = 0; i < this.texts['form'].length; i++) {
      this.subscriptionForm = this.translate.stream(_(`contact.form.${this.texts['form'][i]}.placeholder`)).subscribe((text: string) => {
        if (this.formPlaceholder.length < this.texts['form'].length) {
          this.formPlaceholder.push(text);
        }
      });
    }

    for (let i = 0; i < this.texts['slider'].length; i++) {
      this.subscriptionSlider = this.translate.stream(_(`slider.${this.texts['slider'][i]}.text`)).subscribe((text: string) => {
        if (this.sliderTexts.length < this.texts['slider'].length) {
          this.sliderTexts.push(text);
        }
      });
    }
    
    for (let i = 0; i < this.texts['slider'].length; i++) {
      this.subscriptionSlider = this.translate.stream(_(`slider.${this.texts['slider'][i]}.headline`)).subscribe((text: string) => {
        if (this.sliderHeadlines.length < this.texts['slider'].length) {
          this.sliderHeadlines.push(text);
        }
      });
    }
    console.log(this.sliderTexts);
    console.log('works');

  }

  ngOnDestroy(): void {
    this.subscriptionTextTape.unsubscribe();
    this.subscriptionForm.unsubscribe();
    this.subscriptionSlider.unsubscribe();
    this.subscriptionSliderHeadlines.unsubscribe();
  }
}
