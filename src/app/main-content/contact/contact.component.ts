import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  formData = {
    name: "",
    email: "",
    message: "",
    terms: false
  }

  onSubmit() {
    console.log('submit form with: ' + JSON.stringify(this.formData, null, 2));
    console.log(this.formData);
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.formData.terms = true;
    } else {
      this.formData.terms = false;
    }
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
