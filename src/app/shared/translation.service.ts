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
  texts = ["next", "location", "dev", "remote", "open-to-work"];
  doubled = false;

  private subscription: Subscription;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use(this.translate.getBrowserLang() || "de");
    this.subscription = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => {});
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
      this.updateAtfTextTape();
    } else {
      this.translate.use('en');
      this.updateAtfTextTape();
    }
  }

  updateAtfTextTape() {
    this.textTape = [];
    this.fillTextTape();
  }

  fillTextTape() {
    for (let i = 0; i < this.texts.length; i++) {
      this.subscription = this.translate.stream(_(`atf.text-tape.${this.texts[i]}`)).subscribe((text: string) => {
        if (this.textTape.length < this.texts.length) {
          this.textTape.push(text);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
