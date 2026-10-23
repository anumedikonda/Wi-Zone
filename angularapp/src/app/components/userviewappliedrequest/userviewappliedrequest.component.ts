import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

@Component({
  selector: 'app-userviewappliedrequest',
  templateUrl: './userviewappliedrequest.component.html',
  styleUrls: ['./userviewappliedrequest.component.css']
})
export class UserviewappliedrequestComponent implements OnInit, OnDestroy {

  requests: WifiSchemeRequest[] = [];
  selectedRequest: WifiSchemeRequest | null = null;

  showDeleteModal = false;
  deleteId: number | null = null;

  constructor(
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  loadRequests(): void {
    const userId = Number(localStorage.getItem('userId'));

    this.loaderService.show();   // 👈 loader ON

    this.requestService.getWiFiRequestsByUserId(userId).subscribe({
      next: requests => {
        this.requests = requests.sort(
          (firstRequest, secondRequest) =>
            new Date(secondRequest.requestDate).getTime() -
            new Date(firstRequest.requestDate).getTime()
        );

        this.loaderService.hide();   // 👈 loader OFF (success)
      },
      error: () => {
        this.requests = [];
        this.loaderService.hide();   // 👈 loader OFF (error)
      }
    });
  }

  openDetails(request: WifiSchemeRequest): void {
    this.selectedRequest = request;
    this.lockScroll();
  }

  closeDetails(): void {
    this.selectedRequest = null;
    this.unlockScroll();
  }

  confirmDelete(id: number | undefined): void {
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

  deleteRequest(): void {
    if (this.deleteId === null) {
      return;
    }

    this.loaderService.show();   // 👈 loader ON

    this.requestService.deleteWiFiRequest(this.deleteId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteId = null;
        this.unlockScroll();
        this.loadRequests();   // 👈 ye khud show/hide karega
      },
      error: () => {
        this.loaderService.hide();   // 👈 loader OFF (error)
      }
    });
  }

  writeReview(schemeId: number | undefined): void {
    if (schemeId === undefined) {
      return;
    }

    this.router.navigate(['/user/add-feedback', schemeId]);
  }

  private lockScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    if (!this.selectedRequest && !this.showDeleteModal) {
      document.body.style.overflow = '';
    }
  }
}