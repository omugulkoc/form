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

   visForm = this.fb.group({
    fullName:    this.fb.control(true),
    email:       this.fb.control(true),
    phone:       this.fb.control(true),
    appointment: this.fb.control(true),
    category:    this.fb.control(false),
    quantity:    this.fb.control(true),
    notes:       this.fb.control(false),
    agree:       this.fb.control(true),
  });

   form = this.fb.group({
    details: this.fb.control<SimpleFormValue | null>(null, Validators.required)
  });

   get visibility(): SimpleFormVisibility {
     return this.visForm.getRawValue() as SimpleFormVisibility;
  }

  submit() {
    console.log('Form değeri:', this.form.value.details);
  }

  prefill() {
    this.form.patchValue({
      details: {
        fullName: 'Ozan Muğulkoç',
        email: 'ozan@hotmail.com',
        phone: '+90 533 414 42 42',
        appointment: '2025-09-02T14:30',
        category: 'onemli',
        quantity: 2,
        notes: 'NOt',
        agree: true
      }
    });
  }
}
