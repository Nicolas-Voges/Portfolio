import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
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
}
