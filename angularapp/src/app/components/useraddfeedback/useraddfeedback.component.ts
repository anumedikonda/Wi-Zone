import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  CreateFeedbackRequest,
  FeedbackCategory
} from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedbackForm: FormGroup;

  schemeId: number | null = null;
  showSuccessModal = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly feedbackService: FeedbackService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {
    this.feedbackForm = this.formBuilder.group({
      feedbackText: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          this.meaningfulTextValidator
        ]
      ],
      category: ['', Validators.required]
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId === null) {
      return;
    }

    const schemeId = Number(routeId);

    if (Number.isInteger(schemeId) && schemeId > 0) {
      this.schemeId = schemeId;
    }
  }

  meaningfulTextValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = String(control.value ?? '').trim();

    if (!value) {
      return {
        onlyWhitespace: true
      };
    }

    const letterCount =
      value.match(/[a-zA-Z]/g)?.length ?? 0;

    if (letterCount < 3) {
      return {
        notMeaningful: true
      };
    }

    if (/^[\d\s]+$/.test(value)) {
      return {
        onlyNumbers: true
      };
    }

    if (/^(.)\1+$/.test(value)) {
      return {
        repeatingChars: true
      };
    }

    return null;
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    const userId = Number(
      localStorage.getItem('userId')
    );

    if (!Number.isInteger(userId) || userId <= 0) {
      alert('User information is missing. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    const feedbackText = String(
      this.feedbackForm.value.feedbackText ?? ''
    ).trim();

    const category = this.feedbackForm.value
      .category as FeedbackCategory;

    const payload: CreateFeedbackRequest = {
      feedbackText,
      category,
      date: new Date().toISOString().split('T')[0],
      user: {
        userId
      }
    };

    if (this.schemeId !== null) {
      payload.wifiScheme = {
        wifiSchemeId: this.schemeId
      };
    }

    this.loaderService.show();   // 👈 loader ON

    this.feedbackService
      .createFeedback(payload)
      .subscribe({
        next: () => {
          this.loaderService.hide();   // 👈 loader OFF (success)
          this.showSuccessModal = true;
        },
        error: error => {
          this.loaderService.hide();   // 👈 loader OFF (error)

          alert(
            this.getErrorMessage(
              error,
              'Failed to submit feedback'
            )
          );
        }
      });
  }

  closeModal(): void {
    this.showSuccessModal = false;

    this.router.navigate([
      '/user/my-feedbacks'
    ]);
  }

  private getErrorMessage(
    error: HttpErrorResponse,
    defaultMessage: string
  ): string {
    if (
      typeof error.error === 'string' &&
      error.error.trim()
    ) {
      return error.error;
    }

    if (
      typeof error.error === 'object' &&
      error.error !== null &&
      'message' in error.error
    ) {
      const message = error.error.message;

      if (typeof message === 'string') {
        return message;
      }
    }

    return defaultMessage;
  }
}