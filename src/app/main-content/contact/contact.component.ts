import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslateModule, RouterLink],
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

  http = inject(HttpClient)
  mailTest = false;

  post = {
    endPoint: 'https://nicolas-voges.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    this.removeErrorMessages();
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.formData))
        .subscribe({
          next: (response) => {
            this.mailFeedback();
            ngForm.resetForm();
            this.formData.terms = false;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
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
