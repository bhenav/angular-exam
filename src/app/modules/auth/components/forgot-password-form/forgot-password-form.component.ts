import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exam-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: [ './forgot-password-form.component.sass' ],
})
export class ForgotPasswordFormComponent {
  @Output()
  submitForm: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
