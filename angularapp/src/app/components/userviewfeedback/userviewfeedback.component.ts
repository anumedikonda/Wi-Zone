// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
// import { WifiScheme } from 'src/app/models/wifi-scheme.model';
// import { FeedbackService } from 'src/app/services/feedback.service';

// @Component({
//   selector: 'app-userviewfeedback',
//   templateUrl: './userviewfeedback.component.html',
//   styleUrls: ['./userviewfeedback.component.css']
// })

// export class UserviewfeedbackComponent implements OnInit, OnDestroy {

//   feedbacks: Feedback[] = [];
//   categoryFilter = '';
//   selectedScheme: WifiScheme = null;

//   showDeleteModal = false;
//   deleteId: number | null = null;

//   constructor(private feedbackService: FeedbackService) {}

//   ngOnInit(): void {
//     this.loadFeedbacks();
//   }

//   ngOnDestroy(): void {
//     document.body.style.overflow = '';
//   }

//   loadFeedbacks(): void {
//     const userId = Number(localStorage.getItem('userId'));

//     if (!userId) {
//       console.error('User ID not found in localStorage');
//       this.feedbacks = [];
//       return;
//     }

//     this.feedbackService.getFeedbacksByUserId(userId).subscribe({
//       next: (data) => {
//         this.feedbacks = (data || []).sort((a: any, b: any) => {
//           const dateA = a.date ? new Date(a.date).getTime() : 0;
//           const dateB = b.date ? new Date(b.date).getTime() : 0;
//           if (dateB !== dateA) return dateB - dateA;

//           const fidA = a.feedbackId ?? a.id ?? 0;
//           const fidB = b.feedbackId ?? b.id ?? 0;
//           return fidB - fidA;
//         });
//       },
//       error: () => (this.feedbacks = [])
//     });
//   }

//   filteredFeedbacks(): Feedback[] {
//     return this.feedbacks.filter(
//       (f) => !this.categoryFilter || f.category === this.categoryFilter
//     );
//   }

//   openScheme(scheme: WifiScheme): void {
//     if (!scheme) return;
//     this.selectedScheme = scheme;
//     this.lockScroll();
//   }

//   closeScheme(): void {
//     this.selectedScheme = null;
//     this.unlockScroll();
//   }

//   confirmDelete(id: number): void {
//     this.deleteId = id;
//     this.showDeleteModal = true;
//     this.lockScroll();
//   }

//   cancelDelete(): void {
//     this.showDeleteModal = false;
//     this.deleteId = null;
//     this.unlockScroll();
//   }

//   deleteFeedback(): void {
//     if (!this.deleteId) return;

//     this.feedbackService.deleteFeedback(this.deleteId).subscribe({
//       next: () => {
//         this.showDeleteModal = false;
//         this.deleteId = null;
//         this.unlockScroll();
//         this.loadFeedbacks();
//       },
//       error: (err) => {
//         console.error(err);
//         alert(err.error || 'Failed to delete feedback');
//       }
//     });
//   }

//   private lockScroll(): void {
//     document.body.style.overflow = 'hidden';
//   }

//   private unlockScroll(): void {
//     if (!this.selectedScheme && !this.showDeleteModal) {
//       document.body.style.overflow = '';
//     }
//   }
// }


import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Feedback } from 'src/app/models/feedback.model';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent
  implements OnInit, OnDestroy {

  feedbacks: Feedback[] = [];
  categoryFilter = '';

  selectedScheme: WifiScheme | null = null;

  showDeleteModal = false;
  deleteId: number | null = null;

  constructor(
    private readonly feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  loadFeedbacks(): void {
    const userId = Number(
      localStorage.getItem('userId')
    );

    if (!userId) {
      console.error(
        'User ID not found in localStorage'
      );

      this.feedbacks = [];
      return;
    }

    this.feedbackService
      .getFeedbacksByUserId(userId)
      .subscribe({
        next: feedbacks => {
          this.feedbacks = (feedbacks || []).sort(
            (firstFeedback, secondFeedback) => {
              const firstDate = firstFeedback.date
                ? new Date(
                    firstFeedback.date
                  ).getTime()
                : 0;

              const secondDate = secondFeedback.date
                ? new Date(
                    secondFeedback.date
                  ).getTime()
                : 0;

              if (secondDate !== firstDate) {
                return secondDate - firstDate;
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
        },
        error: () => {
          this.feedbacks = [];
        }
      });
  }

  filteredFeedbacks(): Feedback[] {
    return this.feedbacks.filter(
      feedback =>
        !this.categoryFilter ||
        feedback.category === this.categoryFilter
    );
  }

  openScheme(
    scheme: WifiScheme | null | undefined
  ): void {
    if (!scheme) {
      return;
    }

    this.selectedScheme = scheme;
    this.lockScroll();
  }

  closeScheme(): void {
    this.selectedScheme = null;
    this.unlockScroll();
  }

  confirmDelete(
    id: number | undefined
  ): void {
    if (id === undefined) {
      return;
    }

    this.deleteId = id;
    this.showDeleteModal = true;
    this.lockScroll();
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteId = null;
    this.unlockScroll();
  }

  deleteFeedback(): void {
    if (this.deleteId === null) {
      return;
    }

    this.feedbackService
      .deleteFeedback(this.deleteId)
      .subscribe({
        next: () => {
          this.showDeleteModal = false;
          this.deleteId = null;
          this.unlockScroll();
          this.loadFeedbacks();
        },
        error: error => {
          console.error(error);

          const message =
            typeof error?.error === 'string'
              ? error.error
              : 'Failed to delete feedback';

          alert(message);
        }
      });
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (
      !this.selectedScheme &&
      !this.showDeleteModal
    ) {
      document.body.style.overflow = '';
    }
  }
}