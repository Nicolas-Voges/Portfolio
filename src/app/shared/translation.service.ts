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
  texts = {
    'text-tape': ["remote", "next", "location", "dev", "open-to-work"],
    'form': ["name", "email", "message"],
  };
  doubled = false;

  private subscriptionTextTape: Subscription;
  private subscriptionForm: Subscription;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use(this.translate.getBrowserLang() || "de");
    this.subscriptionTextTape = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => {});
    this.subscriptionForm = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => {});
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
  }

  ngOnDestroy(): void {
    this.subscriptionTextTape.unsubscribe();
    this.subscriptionForm.unsubscribe();
  }
}
