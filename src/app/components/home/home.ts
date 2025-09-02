import { Component,inject  } from '@angular/core';
import { CommonModule,JsonPipe  } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SimpleFormComponent,SimpleFormValue,SimpleFormVisibility } from '../../controls/simple-form/simple-form';

@Component({
  selector: 'app-home',
  imports: [SimpleFormComponent,ReactiveFormsModule,JsonPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 private fb = inject(NonNullableFormBuilder);

  // 👇 hangi alanların görüneceğini burada seçiyoruz
  visibility: SimpleFormVisibility = {
    fullName: true,
    email: true,
    phone: true,
    appointment: true,
    category: false,  // görünmesin
    quantity: true,
    notes: false,     // görünmesin
    agree: true
  };

  form = this.fb.group({
    details: this.fb.control<SimpleFormValue | null>(null, Validators.required)
  });

  submit() {
    console.log('Form değeri:', this.form.value.details);
  }

  prefill() {
    this.form.patchValue({
      details: {
        fullName: 'Atilla Ozan',
        email: 'atilla@example.com',
        phone: '+90 5xx xxx xx xx',
        appointment: '2025-09-02T14:30',
        category: 'onemli',
        quantity: 2,
        notes: 'Örnek not',
        agree: true
      }
    });
  }
}
