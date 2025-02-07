import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';

import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  de = true;
  public textTape: string[] = [];
  texts = ["next", "location", "dev", "remote", "open-to-work"];

  private subscription: Subscription;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use(this.translate.getBrowserLang() || "de");
    // this.translate.stream(_('atf.text-tape.open-to-work')).subscribe((text: string) => {
    //   console.log(`using get(): ${text}`);
    // });
    this.subscription = translate.stream(_(`atf.text-tape.`)).subscribe((text: string) => {
      // console.log(`using stream() constructor: ${text}`);
      
    // this.updateAtfTextTape();
  });
    this.useLanguage();
  }

  changeLanguage() {
    if (this.de) {
      this.de = false;
    } else {
      this.de = true;
    }
    // console.log(this.de);

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
    // this.fillTextTape();
    // console.log(this.textTape);
  }

  fillTextTape() {
    for (let i = 0; i < this.texts.length; i++) {

      this.subscription = this.translate.stream(_(`atf.text-tape.${this.texts[i]}`)).subscribe((text: string) => {
        // console.log(`using stream(): ${text}`);
        if (this.textTape.length < this.texts.length) {
          this.textTape.push(text);
          // console.log(text);
        }
      });

      // this.translate.stream(_(`atf.text-tape.${this.texts[i]}`)).subscribe((text: string) => {
       
      // });
    }
    console.log(this.textTape);
    
  }

  doubleTextape() {
    this.textTape.forEach( (element) => {
      this.textTape.push(element);
    });
    console.log(this.textTape);
    console.log('After doppel');
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
