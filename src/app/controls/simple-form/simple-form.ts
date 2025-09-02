import { Component, forwardRef, signal, effect, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

export interface SimpleFormValue {
  fullName: string;
  email: string;
  phone: string;
  appointment: string; // YYYY-MM-DDTHH:mm (datetime-local)
  category: string;
  quantity: number | null;
  notes: string;
  agree: boolean;
}

@Component({
  selector: 'app-simple-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SimpleFormComponent),
    multi: true
  }],
  templateUrl: './simple-form.html',
  styleUrls: ['./simple-form.css']
})
export class SimpleFormComponent implements ControlValueAccessor {
  
    @Input() visibility: SimpleFormVisibility = {
    fullName: false,
    email: true,
    phone: false,
    appointment: false,
    category: false,
    quantity: false,
    notes: false,
    agree: false
  };


  form!: FormGroup<{
    fullName: any;
    email: any;
    phone: any;
    appointment: any;
    category: any;
    quantity: any;
    notes: any;
    agree: any;
  }>;

  private onChange: (v: SimpleFormValue | null) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = signal(false);

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      fullName: this.fb.control('', { validators: [Validators.required, Validators.minLength(2)] }),
      email: this.fb.control('', { validators: [Validators.required, Validators.email] }),
      phone: this.fb.control('', { validators: [Validators.required] }),
      appointment: this.fb.control('', { validators: [Validators.required] }),
      category: this.fb.control('', { validators: [Validators.required] }),
      quantity: this.fb.control<number | null>(1, { validators: [Validators.required, Validators.min(1)] }),
      notes: this.fb.control(''),
      agree: this.fb.control(false, { validators: [Validators.requiredTrue] }),
    });

    this.form.valueChanges.subscribe(v => {
      if (!this.disabled()) this.onChange(v as SimpleFormValue);
    });

    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  // CVA metotları
  writeValue(value: SimpleFormValue | null): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    } else {
      this.form.reset({
        fullName: '',
        email: '',
        phone: '',
        appointment: '',
        category: '',
        quantity: 1,
        notes: '',
        agree: false
      }, { emitEvent: false });
    }
  }
  registerOnChange(fn: (v: SimpleFormValue | null) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }
}
export interface SimpleFormVisibility {
  fullName?: boolean;
  email?: boolean;
  phone?: boolean;
  appointment?: boolean;
  category?: boolean;
  quantity?: boolean;
  notes?: boolean;
  agree?: boolean;
}