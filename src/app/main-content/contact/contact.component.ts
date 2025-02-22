import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from '../../shared/translation.service';
import AOS from 'aos';

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
  sendMessage  = false;

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log('submit form with: ' + JSON.stringify(this.formData, null, 2));
      console.log(this.formData);
      this.formData = {
        name: "",
        email: "",
        message: "",
        terms: false
      }
      this.sendMessage = true;
    }
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

  checkValidationError() {
    console.error('err');
    
  }

  ngOnInit() {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      delay: 100,
    });
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
