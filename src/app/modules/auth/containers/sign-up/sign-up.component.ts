import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { AuthState } from '../../models/auth-state.model';
import { SignUp } from '../../models/sign-up.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'exam-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [ './sign-up.component.sass' ],
})
export class SignUpComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(model: SignUp) {
    this.authService.signUp(model).subscribe(() => {
      this.dashboardService.redirectIndex();
    });
  }

  state(): AuthState {
    return this.authService.state$.value;
  }
}
