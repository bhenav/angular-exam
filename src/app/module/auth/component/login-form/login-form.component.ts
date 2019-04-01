import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../model/login.model';

@Component({
  selector: 'exam-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.sass' ],
})
export class LoginFormComponent {
  @Output()
  submitForm: EventEmitter<Login> = new EventEmitter<Login>();

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
  });

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }
}
