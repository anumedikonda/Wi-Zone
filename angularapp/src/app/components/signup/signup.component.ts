import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  showPassword = false;
  showConfirmPassword = false;
  showSuccessModal = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],

        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            )
          ]
        ],

        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{10}$')
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],

        confirmPassword: ['', Validators.required],

        userRole: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {

    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { mismatch: true };
  }

  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  isValid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);

    return !!(
      control &&
      control.valid &&
      control.touched
    );
  }

  hasPasswordMismatch(): boolean {
    return !!(
      this.signupForm.errors?.['mismatch'] &&
      this.f['confirmPassword'].touched &&
      !this.f['confirmPassword'].errors?.['required']
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSignup(): void {
    this.errorMessage = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formValue = this.signupForm.getRawValue();

    const userData = {
      username: formValue.username.trim(),
      email: formValue.email.trim(),
      mobileNumber: formValue.mobileNumber.trim(),
      password: formValue.password,
      userRole: formValue.userRole
    };

    this.auth.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.showSuccessModal = true;
      },

      error: (error) => {
        this.isLoading = false;

        if (typeof error?.error === 'string') {
          this.errorMessage = error.error;
        } else if (error?.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error?.status === 409) {
          this.errorMessage =
            'An account with this email already exists.';
        } else if (error?.status === 0) {
          this.errorMessage =
            'Unable to connect to the server. Please try again.';
        } else {
          this.errorMessage =
            'Registration failed. Please check your details and try again.';
        }
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.signupForm.reset();
    this.router.navigate(['/login']);
  }
}