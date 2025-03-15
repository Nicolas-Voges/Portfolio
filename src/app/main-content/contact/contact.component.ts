import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  translation = inject(TranslationService);
  ngForm: NgForm | undefined;
  formData = {
    name: "",
    email: "",
    message: "",
    terms: false
  }
  sendMessage = false;
  @ViewChild('nameErr') nameErr?: ElementRef;
  @ViewChild('emailErr') emailErr?: ElementRef;
  @ViewChild('messageErr') messageErr?: ElementRef;
  @ViewChild('policyCheck') policyCheck?: ElementRef;

  onSubmit(ngForm: NgForm) {
    this.removeErrorMessages();
    if (ngForm.valid && ngForm.submitted) {
      console.log('submit form with: ' + JSON.stringify(this.formData, null, 2));
      console.log(this.formData);
      this.formData = {
        name: "",
        email: "",
        message: "",
        terms: false
      }
      this.mailFeedback();
    } else {
      this.checkValidationError(ngForm);
    }
  }

  mailFeedback() {
    this.sendMessage = true;
    if (this.policyCheck) {
      this.policyCheck.nativeElement.checked = false;
    }
    let id = setTimeout(() => {
      this.sendMessage = false;
      clearTimeout(id);
    }, 4000)
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.formData.terms = true;
    } else {
      this.formData.terms = false;
    }
  }

  getForm(form: NgForm) {
    this.ngForm = form;
  }

  checkValidationError(form: NgForm) {
    if (form.controls['name'].status == 'INVALID') {
      if (this.nameErr) {
        this.nameErr.nativeElement.style.opacity = '1';
        this.nameErr.nativeElement.style.height = 'auto';
      }
    }
    if (form.controls['email'].status == 'INVALID') {
      if (this.emailErr) {
        this.emailErr.nativeElement.style.opacity = '1';
        this.emailErr.nativeElement.style.height = 'auto';
      }
    }
    if (form.controls['message'].status == 'INVALID') {
      if (this.messageErr) {
        this.messageErr.nativeElement.style.opacity = '1';
        this.messageErr.nativeElement.style.height = 'auto';
      }
    }
  }

  removeErrorMessages() {
    if (this.nameErr) {
      this.nameErr.nativeElement.style.opacity = '0';
      this.nameErr.nativeElement.style.height = '0';
    }
    if (this.emailErr) {
      this.emailErr.nativeElement.style.opacity = '0';
      this.emailErr.nativeElement.style.height = '0';
    }
    if (this.messageErr) {
      this.messageErr.nativeElement.style.opacity = '0';
      this.messageErr.nativeElement.style.height = '0';
    }
  }
}
