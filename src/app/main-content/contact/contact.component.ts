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
      this.checkValidationErrors(ngForm);
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

  checkValidationErrors(form: NgForm) {
    this.checkValidation(form, 'name', this.nameErr);
    this.checkValidation(form, 'email', this.emailErr);
    this.checkValidation(form, 'message', this.messageErr);
  }

  checkValidation(form: NgForm, field: string, ref: ElementRef | undefined) {
    if (form.controls[field].status == 'INVALID') {
      if (ref) {
        ref.nativeElement.style.opacity = '1';
        ref.nativeElement.style.height = 'auto';
      }
    }
  }

  removeErrorMessages() {
    this.hideError(this.nameErr);
    this.hideError(this.emailErr);
    this.hideError(this.messageErr);
  }

  hideError(ref: ElementRef | undefined) {
    if (ref) {
      ref.nativeElement.style.opacity = '0';
      ref.nativeElement.style.height = '0';
    }
  }
}
