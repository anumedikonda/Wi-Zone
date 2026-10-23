
// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// import {
//   AvailabilityStatus,
//   WifiScheme
// } from 'src/app/models/wifi-scheme.model';
// import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';

// @Component({
//   selector: 'app-admin-view-scheme',
//   templateUrl: './admin-view-scheme.component.html',
//   styleUrls: ['./admin-view-scheme.component.css']
// })
// export class AdminViewSchemeComponent implements OnInit {

//   schemes: WifiScheme[] = [];
//   regions: string[] = [];

//   searchTerm = '';
//   selectedRegion = '';

//   showDeleteModal = false;
//   deleteId: number | null = null;

//   showSuccessModal = false;
//   successMessage = '';

//   constructor(
//     private readonly schemeService: WifiSchemeService,
//     private readonly router: Router
//   ) {}

//   ngOnInit(): void {
//     this.loadSchemes();
//   }

//   loadSchemes(): void {
//     this.schemeService.getAllWiFiSchemes().subscribe({
//       next: schemes => {
//         this.schemes = [...schemes].sort(
//           (firstScheme, secondScheme) =>
//             (secondScheme.wifiSchemeId ?? 0) -
//             (firstScheme.wifiSchemeId ?? 0)
//         );

//         this.regions = [
//           ...new Set(
//             schemes
//               .map(scheme => scheme.region)
//               .filter(region => Boolean(region))
//           )
//         ];
//       },
//       error: () => {
//         this.schemes = [];
//         this.regions = [];
//       }
//     });
//   }

//   filteredSchemes(): WifiScheme[] {
//     const normalizedSearchTerm =
//       this.searchTerm.trim().toLowerCase();

//     return this.schemes.filter(scheme => {
//       const normalizedSchemeName =
//         scheme.schemeName.trim().toLowerCase();

//       const matchesSearchTerm =
//         !normalizedSearchTerm ||
//         normalizedSchemeName.includes(normalizedSearchTerm);

//       const matchesRegion =
//         !this.selectedRegion ||
//         scheme.region === this.selectedRegion;

//       return matchesSearchTerm && matchesRegion;
//     });
//   }

//   edit(schemeId: number | undefined): void {
//     if (schemeId === undefined) {
//       return;
//     }

//     this.router.navigate(['/admin/edit-scheme', schemeId]);
//   }

//   confirmDelete(schemeId: number | undefined): void {
//     if (schemeId === undefined) {
//       return;
//     }

//     this.deleteId = schemeId;
//     this.showDeleteModal = true;
//   }

//   cancelDelete(): void {
//     this.deleteId = null;
//     this.showDeleteModal = false;
//   }

//   deleteScheme(): void {
//     if (this.deleteId === null) {
//       return;
//     }

//     const schemeId = this.deleteId;

//     this.schemeService.deleteWiFiScheme(schemeId).subscribe({
//       next: () => {
//         this.showDeleteModal = false;
//         this.deleteId = null;

//         this.successMessage =
//           'WiFi Scheme Deleted Successfully!';

//         this.showSuccessModal = true;
//         this.loadSchemes();
//       },
//       error: error => {
//         this.showDeleteModal = false;
//         this.deleteId = null;

//         alert(
//           this.getErrorMessage(
//             error,
//             'Failed to delete scheme'
//           )
//         );
//       }
//     });
//   }

//   toggleAvailability(scheme: WifiScheme): void {
//     if (scheme.wifiSchemeId === undefined) {
//       return;
//     }

//     const availabilityStatus: AvailabilityStatus =
//       scheme.availabilityStatus === 'Available'
//         ? 'Unavailable'
//         : 'Available';

//     const updatedScheme: WifiScheme = {
//       ...scheme,
//       availabilityStatus
//     };

//     this.schemeService
//       .updateWiFiScheme(scheme.wifiSchemeId, updatedScheme)
//       .subscribe({
//         next: () => {
//           this.successMessage =
//             'Availability Updated Successfully!';

//           this.showSuccessModal = true;
//           this.loadSchemes();
//         },
//         error: error => {
//           alert(
//             this.getErrorMessage(
//               error,
//               'Failed to update availability'
//             )
//           );
//         }
//       });
//   }

//   closeSuccessModal(): void {
//     this.showSuccessModal = false;
//     this.successMessage = '';
//   }

//   private getErrorMessage(
//     error: HttpErrorResponse,
//     defaultMessage: string
//   ): string {
//     if (typeof error.error === 'string' && error.error.trim()) {
//       return error.error;
//     }

//     if (
//       typeof error.error === 'object' &&
//       error.error !== null &&
//       'message' in error.error &&
//       typeof error.error.message === 'string'
//     ) {
//       return error.error.message;
//     }

//     return defaultMessage;
//   }
// }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AvailabilityStatus,
  WifiScheme
} from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

@Component({
  selector: 'app-admin-view-scheme',
  templateUrl: './admin-view-scheme.component.html',
  styleUrls: ['./admin-view-scheme.component.css']
})
export class AdminViewSchemeComponent implements OnInit {

  schemes: WifiScheme[] = [];
  regions: string[] = [];

  searchTerm = '';
  selectedRegion = '';

  showDeleteModal = false;
  deleteId: number | null = null;

  showSuccessModal = false;
  successMessage = '';

  constructor(
    private readonly schemeService: WifiSchemeService,
    private readonly router: Router,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadSchemes();
  }

  loadSchemes(): void {
    this.loaderService.show();   // 👈 loader ON

    this.schemeService.getAllWiFiSchemes().subscribe({
      next: schemes => {
        this.schemes = [...schemes].sort(
          (firstScheme, secondScheme) =>
            (secondScheme.wifiSchemeId ?? 0) -
            (firstScheme.wifiSchemeId ?? 0)
        );

        this.regions = [
          ...new Set(
            schemes
              .map(scheme => scheme.region)
              .filter(region => Boolean(region))
          )
        ];

        this.loaderService.hide();   // 👈 loader OFF (success)
      },
      error: () => {
        this.schemes = [];
        this.regions = [];
        this.loaderService.hide();   // 👈 loader OFF (error)
      }
    });
  }

  filteredSchemes(): WifiScheme[] {
    const normalizedSearchTerm =
      this.searchTerm.trim().toLowerCase();

    return this.schemes.filter(scheme => {
      const normalizedSchemeName =
        scheme.schemeName.trim().toLowerCase();

      const matchesSearchTerm =
        !normalizedSearchTerm ||
        normalizedSchemeName.includes(normalizedSearchTerm);

      const matchesRegion =
        !this.selectedRegion ||
        scheme.region === this.selectedRegion;

      return matchesSearchTerm && matchesRegion;
    });
  }

  edit(schemeId: number | undefined): void {
    if (schemeId === undefined) {
      return;
    }

    this.router.navigate(['/admin/edit-scheme', schemeId]);
  }

  confirmDelete(schemeId: number | undefined): void {
    if (schemeId === undefined) {
      return;
    }

    this.deleteId = schemeId;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.deleteId = null;
    this.showDeleteModal = false;
  }

  deleteScheme(): void {
    if (this.deleteId === null) {
      return;
    }

    const schemeId = this.deleteId;

    this.loaderService.show();   // 👈 loader ON

    this.schemeService.deleteWiFiScheme(schemeId).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteId = null;

        this.successMessage =
          'WiFi Scheme Deleted Successfully!';

        this.showSuccessModal = true;
        this.loadSchemes();   // 👈 ye khud show/hide karega
      },
      error: error => {
        this.showDeleteModal = false;
        this.deleteId = null;

        this.loaderService.hide();   // 👈 loader OFF (error)

        alert(
          this.getErrorMessage(
            error,
            'Failed to delete scheme'
          )
        );
      }
    });
  }

  toggleAvailability(scheme: WifiScheme): void {
    if (scheme.wifiSchemeId === undefined) {
      return;
    }

    const availabilityStatus: AvailabilityStatus =
      scheme.availabilityStatus === 'Available'
        ? 'Unavailable'
        : 'Available';

    const updatedScheme: WifiScheme = {
      ...scheme,
      availabilityStatus
    };

    this.loaderService.show();   // 👈 loader ON

    this.schemeService
      .updateWiFiScheme(scheme.wifiSchemeId, updatedScheme)
      .subscribe({
        next: () => {
          this.successMessage =
            'Availability Updated Successfully!';

          this.showSuccessModal = true;
          this.loadSchemes();   // 👈 ye khud show/hide karega
        },
        error: error => {
          this.loaderService.hide();   // 👈 loader OFF (error)

          alert(
            this.getErrorMessage(
              error,
              'Failed to update availability'
            )
          );
        }
      });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.successMessage = '';
  }

  private getErrorMessage(
    error: HttpErrorResponse,
    defaultMessage: string
  ): string {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (
      typeof error.error === 'object' &&
      error.error !== null &&
      'message' in error.error &&
      typeof error.error.message === 'string'
    ) {
      return error.error.message;
    }

    return defaultMessage;
  }
}