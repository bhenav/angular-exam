import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordFormComponent } from './component/forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { SignUpFormComponent } from './component/sign-up-form/sign-up-form.component';
import { AuthComponent } from './container/auth/auth.component';
import { ForgotPasswordComponent } from './container/forgot-password/forgot-password.component';
import { LoginComponent } from './container/login/login.component';
import { SignUpComponent } from './container/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    LoginFormComponent,
    SignUpFormComponent,
    ForgotPasswordFormComponent,
  ],
})
export class AuthModule {
}
