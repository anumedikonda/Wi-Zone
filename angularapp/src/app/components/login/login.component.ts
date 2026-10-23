import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  showPassword = false;
  loginError = '';
  isLoading = false;
  rememberMe = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          )
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });

    this.loadRememberedEmail();
  }

  get f() {
    return this.loginForm.controls;
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  isValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);

    return !!(
      control &&
      control.valid &&
      control.touched
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loadRememberedEmail(): void {
    const savedEmail = localStorage.getItem('rememberedEmail');

    if (savedEmail) {
      this.rememberMe = true;

      this.loginForm.patchValue({
        email: savedEmail
      });
    }
  }

  onLogin(): void {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password
    };

    this.auth.login(loginData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        const userData = response.user || response;

        const token =
          response.token ||
          response.jwtToken ||
          response.accessToken ||
          '';

        const username =
          userData.username ||
          response.username ||
          '';

        const userRole =
          userData.userRole ||
          response.userRole ||
          response.role ||
          '';

        const userId =
          userData.userId ||
          response.userId ||
          '';

        if (token) {
          localStorage.setItem(
            'token',
            String(token)
          );
        }

        if (username) {
          localStorage.setItem(
            'username',
            String(username)
          );
        }

        if (userRole) {
          localStorage.setItem(
            'role',
            String(userRole)
          );

          localStorage.setItem(
            'userRole',
            String(userRole)
          );
        }

        if (
          userId !== '' &&
          userId !== null &&
          userId !== undefined
        ) {
          localStorage.setItem(
            'userId',
            String(userId)
          );
        }

        if (this.rememberMe) {
          localStorage.setItem(
            'rememberedEmail',
            loginData.email
          );
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        const normalizedRole =
          String(userRole).toLowerCase();

        if (normalizedRole === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (normalizedRole === 'user') {
          this.router.navigate(['/user/home']);
        } else {
          this.loginError =
            'Login successful, but the account role was not found.';
        }
      },

      error: (error: any) => {
        this.isLoading = false;

        if (error?.status === 0) {
          this.loginError =
            'Unable to connect to the server. Please try again.';
        } else if (
          error?.status === 401 ||
          error?.status === 403
        ) {
          this.loginError =
            'Invalid email or password';
        } else if (typeof error?.error === 'string') {
          this.loginError =
            error.error || 'Invalid email or password';
        } else if (error?.error?.message) {
          this.loginError =
            error.error.message;
        } else {
          this.loginError =
            'Login failed. Please check your credentials.';
        }
      }
    });
  }
}