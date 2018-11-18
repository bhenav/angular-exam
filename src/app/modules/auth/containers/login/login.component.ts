import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../models/auth-state.model';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'exam-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.sass' ],
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(model: Login) {
    this.authService.login(model).subscribe(() => {
    });
  }

  state(): AuthState {
    return this.authService.state$.value;
  }
}
