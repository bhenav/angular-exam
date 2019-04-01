import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../component/base.component';
import { AuthState } from '../../model/auth-state.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'exam-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.sass' ],
})
export class AuthComponent implements OnInit, BaseComponent<AuthState, AuthService> {
  @Input()
  back: boolean;

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit() {
  }

  service(): AuthService {
    return this.authService;
  }

  state(): AuthState {
    return this.service().state$.value;
  }

}
