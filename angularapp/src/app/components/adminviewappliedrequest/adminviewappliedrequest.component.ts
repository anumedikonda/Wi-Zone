import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {
  RequestStatus,
  RequestStatusFilter,
  WifiSchemeRequest
} from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

@Component({
  selector: 'app-adminviewappliedrequest',
  templateUrl: './adminviewappliedrequest.component.html',
  styleUrls: ['./adminviewappliedrequest.component.css']
})
export class AdminviewappliedrequestComponent
implements OnInit {

  readonly statusOptions:
    readonly RequestStatus[] = [
      'Pending',
      'Approved',
      'Rejected'
    ];

  requests: WifiSchemeRequest[] = [];

  searchTerm = '';
  statusFilter: RequestStatusFilter = '';

  selectedRequest:
    WifiSchemeRequest | null = null;

  constructor(
    private readonly requestService:
      WifiSchemeRequestService,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loaderService.show();   // 👈 loader ON

    this.requestService
      .getAllWiFiRequests()
      .subscribe({
        next: requests => {
          this.requests = [...requests].sort(
            (firstRequest, secondRequest) =>
              this.getDateTime(
                secondRequest.requestDate
              ) -
              this.getDateTime(
                firstRequest.requestDate
              )
          );

          this.loaderService.hide();   // 👈 loader OFF (success)
        },
        error: () => {
          this.requests = [];
          this.loaderService.hide();   // 👈 loader OFF (error)
        }
      });
  }

  filteredRequests(): WifiSchemeRequest[] {
    const normalizedSearchTerm =
      this.searchTerm.trim().toLowerCase();

    return this.requests.filter(request => {
      const schemeName =
        request.wifiScheme?.schemeName
          ?.toLowerCase() ?? '';

      const matchesTerm =
        !normalizedSearchTerm ||
        schemeName.includes(
          normalizedSearchTerm
        );

      const matchesStatus =
        !this.statusFilter ||
        request.status === this.statusFilter;

      return matchesTerm && matchesStatus;
    });
  }

  showDetails(
    request: WifiSchemeRequest
  ): void {
    this.selectedRequest = request;
  }

  closeDetails(): void {
    this.selectedRequest = null;
  }

  updateStatus(
    request: WifiSchemeRequest,
    status: RequestStatus
  ): void {
    if (
      request.wifiSchemeRequestId === undefined
    ) {
      alert('WiFi scheme request ID is missing');
      return;
    }

    const updatedRequest:
      WifiSchemeRequest = {
        ...request,
        status
      };

    this.loaderService.show();   // 👈 loader ON

    this.requestService
      .updateWiFiRequest(
        request.wifiSchemeRequestId,
        updatedRequest
      )
      .subscribe({
        next: () => {
          this.closeDetails();
          this.loadRequests();   // 👈 ye khud show/hide karega
        },
        error: error => {
          this.loaderService.hide();   // 👈 loader OFF (error)

          alert(
            this.getErrorMessage(
              error,
              'Failed to update status'
            )
          );
        }
      });
  }

  private getDateTime(
    date: Date | string
  ): number {
    const time = new Date(date).getTime();

    return Number.isNaN(time) ? 0 : time;
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