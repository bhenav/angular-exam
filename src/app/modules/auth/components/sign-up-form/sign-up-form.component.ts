import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp } from '../../models/sign-up.model';

@Component({
  selector: 'exam-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: [ './sign-up-form.component.sass' ],
})
export class SignUpFormComponent {

  @Output()
  submitForm: EventEmitter<SignUp> = new EventEmitter<SignUp>();

  form: FormGroup = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
