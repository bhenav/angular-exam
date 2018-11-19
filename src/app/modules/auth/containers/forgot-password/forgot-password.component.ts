import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../models/auth-state.model';
import { ForgotPassword } from '../../models/forgot-password.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'exam-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [ './forgot-password.component.sass' ],
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
  }


  onSubmit(model: ForgotPassword) {
    this.authService.forgotPassword(model).subscribe(() => {
      this.authService.redirectLogin();
    });
  }

  state(): AuthState {
    return this.authService.state$.value;
  }
}
