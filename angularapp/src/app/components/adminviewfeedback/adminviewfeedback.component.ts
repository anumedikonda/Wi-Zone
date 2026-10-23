import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Feedback,
  FeedbackCategory
} from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

type FeedbackCategoryFilter =
  FeedbackCategory | '';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent
implements OnInit, OnDestroy {

  readonly categoryOptions:
    readonly FeedbackCategory[] = [
      'Service',
      'Pricing',
      'Speed',
      'Support'
    ];

  feedbacks: Feedback[] = [];

  categoryFilter: FeedbackCategoryFilter = '';

  selectedUser: User | null = null;
  selectedScheme: WifiScheme | null = null;

  constructor(
    private readonly feedbackService:
      FeedbackService,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  ngOnDestroy(): void {
    this.resetBodyScroll();
  }

  loadFeedbacks(): void {
    this.loaderService.show();   // 👈 loader ON

    this.feedbackService
      .getAllFeedbacks()
      .subscribe({
        next: feedbacks => {
          this.feedbacks = [...feedbacks].sort(
            (
              firstFeedback,
              secondFeedback
            ) => {
              const dateDifference =
                this.getDateTime(
                  secondFeedback.date
                ) -
                this.getDateTime(
                  firstFeedback.date
                );

              if (dateDifference !== 0) {
                return dateDifference;
              }

              const firstFeedbackId =
                firstFeedback.feedbackId ?? 0;

              const secondFeedbackId =
                secondFeedback.feedbackId ?? 0;

              return (
                secondFeedbackId -
                firstFeedbackId
              );
            }
          );

          this.loaderService.hide();   // 👈 loader OFF (success)
        },
        error: () => {
          this.feedbacks = [];
          this.loaderService.hide();   // 👈 loader OFF (error)
        }
      });
  }

  filteredFeedbacks(): Feedback[] {
    return this.feedbacks.filter(
      feedback =>
        !this.categoryFilter ||
        feedback.category ===
          this.categoryFilter
    );
  }

  openUser(
    user: User | undefined
  ): void {
    if (user === undefined) {
      return;
    }

    this.selectedUser = user;
    this.lockScroll();
  }

  closeUser(): void {
    this.selectedUser = null;
    this.unlockScroll();
  }

  openScheme(
    scheme: WifiScheme | undefined
  ): void {
    if (scheme === undefined) {
      return;
    }

    this.selectedScheme = scheme;
    this.lockScroll();
  }

  closeScheme(): void {
    this.selectedScheme = null;
    this.unlockScroll();
  }

  private getDateTime(
    date: Date | string
  ): number {
    const time = new Date(date).getTime();

    return Number.isNaN(time) ? 0 : time;
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (
      this.selectedUser === null &&
      this.selectedScheme === null
    ) {
      this.resetBodyScroll();
    }
  }

  private resetBodyScroll(): void {
    document.body.style.overflow = '';
  }
}