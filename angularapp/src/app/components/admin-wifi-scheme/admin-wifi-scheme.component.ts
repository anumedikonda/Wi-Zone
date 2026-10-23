import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AvailabilityStatus,
  WifiScheme
} from 'src/app/models/wifi-scheme.model';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

interface WifiSchemeForm {
  schemeName: FormControl<string>;
  description: FormControl<string>;
  region: FormControl<string>;
  speed: FormControl<string>;
  dataLimit: FormControl<string>;
  fee: FormControl<string>;
  availabilityStatus: FormControl<AvailabilityStatus>;
}

@Component({
  selector: 'app-admin-wifi-scheme',
  templateUrl: './admin-wifi-scheme.component.html',
  styleUrls: ['./admin-wifi-scheme.component.css']
})
export class AdminWifiSchemeComponent implements OnInit {

  readonly availabilityOptions: readonly AvailabilityStatus[] = [
    'Available',
    'Unavailable'
  ];

  readonly schemeForm: FormGroup<WifiSchemeForm>;

  isEditing = false;
  schemeId: number | null = null;

  showSuccessModal = false;
  showAllRequired = false;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly schemeService: WifiSchemeService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {
    this.schemeForm = this.createSchemeForm();
  }

  get f(): WifiSchemeForm {
    return this.schemeForm.controls;
  }

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId === null) {
      return;
    }

    const schemeId = Number(routeId);

    if (!Number.isInteger(schemeId) || schemeId <= 0) {
      alert('Invalid WiFi scheme ID');
      this.goBack();
      return;
    }

    this.isEditing = true;
    this.schemeId = schemeId;

    this.loadScheme(schemeId);
  }

  loadScheme(id: number): void {
    this.loaderService.show();   // 👈 loader ON

    this.schemeService.getWiFiSchemeById(id).subscribe({
      next: scheme => {
        this.schemeForm.patchValue({
          schemeName: scheme.schemeName,
          description: scheme.description,
          region: scheme.region,
          speed: this.removeUnit(scheme.speed, 'Mbps'),
          dataLimit: this.removeUnit(scheme.dataLimit, 'GB'),
          fee: String(scheme.fee),
          availabilityStatus: scheme.availabilityStatus
        });

        this.loaderService.hide();   // 👈 loader OFF (success)
      },
      error: error => {
        this.loaderService.hide();   // 👈 loader OFF (error)

        alert(
          this.getErrorMessage(error, 'Failed to load scheme')
        );
      }
    });
  }

  onSubmit(): void {
    if (this.schemeForm.invalid) {
      this.schemeForm.markAllAsTouched();
      this.showAllRequired = true;
      return;
    }

    this.showAllRequired = false;

    const formValue = this.schemeForm.getRawValue();

    const wifiScheme: WifiScheme = {
      schemeName: formValue.schemeName.trim(),
      description: formValue.description.trim(),
      region: formValue.region.trim(),
      speed: `${formValue.speed.trim()} Mbps`,
      dataLimit: `${formValue.dataLimit.trim()} GB`,
      fee: Number(formValue.fee),
      availabilityStatus: formValue.availabilityStatus
    };

    if (this.isEditing) {
      this.updateScheme(wifiScheme);
      return;
    }

    this.addScheme(wifiScheme);
  }

  closeModal(): void {
    this.showSuccessModal = false;

    this.router.navigate(['/admin/view-schemes']);
  }

  goBack(): void {
    this.router.navigate(['/admin/view-schemes']);
  }

  private createSchemeForm(): FormGroup<WifiSchemeForm> {
    return this.formBuilder.group({
      schemeName: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z][A-Za-z0-9 ]*$/)
        ]
      ),

      description: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
          Validators.pattern(/^(?!\s*$).+/)
        ]
      ),

      region: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.pattern(/^[A-Za-z][A-Za-z ]*$/)
        ]
      ),

      speed: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
          Validators.min(1),
          Validators.max(1000)
        ]
      ),

      dataLimit: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
          Validators.min(1),
          Validators.max(1000)
        ]
      ),

      fee: this.formBuilder.control(
        '',
        [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
          Validators.min(99),
          Validators.max(11000)
        ]
      ),

      availabilityStatus:
        this.formBuilder.control<AvailabilityStatus>(
          'Available',
          Validators.required
        )
    });
  }

  private addScheme(wifiScheme: WifiScheme): void {
    this.loaderService.show();   // 👈 loader ON

    this.schemeService.addWiFiScheme(wifiScheme).subscribe({
      next: () => {
        this.loaderService.hide();   // 👈 loader OFF (success)
        this.showSuccessModal = true;
      },
      error: error => {
        this.loaderService.hide();   // 👈 loader OFF (error)

        alert(
          this.getErrorMessage(error, 'Failed to add WiFi scheme')
        );
      }
    });
  }

  private updateScheme(wifiScheme: WifiScheme): void {
    if (this.schemeId === null) {
      alert('WiFi scheme ID is required for update');
      return;
    }

    const updatedScheme: WifiScheme = {
      ...wifiScheme,
      wifiSchemeId: this.schemeId
    };

    this.loaderService.show();   // 👈 loader ON

    this.schemeService
      .updateWiFiScheme(this.schemeId, updatedScheme)
      .subscribe({
        next: () => {
          this.loaderService.hide();   // 👈 loader OFF (success)
          this.showSuccessModal = true;
        },
        error: error => {
          this.loaderService.hide();   // 👈 loader OFF (error)

          alert(
            this.getErrorMessage(error, 'Failed to update WiFi scheme')
          );
        }
      });
  }

  private removeUnit(
    value: string | number | null | undefined,
    unit: 'Mbps' | 'GB'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    return String(value).replace(unit, '').trim();
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