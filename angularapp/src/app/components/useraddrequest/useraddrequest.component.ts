import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';

interface RequestFormValue {
  streetName: string;
  landmark: string;
  city: string;
  state: string;
  zipCode: string;
  preferredSetupDate: string;
  timeSlot: string;
  comments: string;
}

@Component({
  selector: 'app-useraddrequest',
  templateUrl: './useraddrequest.component.html',
  styleUrls: ['./useraddrequest.component.css']
})
export class UseraddrequestComponent implements OnInit {

  requestForm: FormGroup;
  schemeId!: number;

  proofBase64 = '';
  proofError = '';
  showSuccessModal = false;

  readonly today = new Date().toISOString().split('T')[0];

  constructor(
    private readonly fb: FormBuilder,
    private readonly requestService: WifiSchemeRequestService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.requestForm = this.fb.group({
      streetName: ['', Validators.required],
      landmark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern('^[0-9]{6}$')
        ]
      ],
      preferredSetupDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      comments: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.requestForm.controls;
  }

  ngOnInit(): void {
    const routeSchemeId = this.route.snapshot.paramMap.get('id');
    this.schemeId = Number(routeSchemeId);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.proofError = 'File size must be less than 2MB';
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        this.proofError = 'Unable to read the selected file';
        return;
      }

      this.proofBase64 = reader.result;
      this.proofError = '';
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    if (!this.proofBase64) {
      this.proofError = 'Proof document is required';
      return;
    }

    const userId = Number(localStorage.getItem('userId'));

    const formValue: RequestFormValue = this.requestForm.getRawValue();

    const requestDate = new Date().toISOString().split('T')[0];

    const payload: WifiSchemeRequest = {
      ...formValue,
      userId,
      wifiSchemeId: this.schemeId,
      requestDate,
      status: 'Pending',
      proof: this.proofBase64,
      user: {
        userId
      },
      wifiScheme: {
        wifiSchemeId: this.schemeId
      }
    };

    this.requestService.addWiFiRequest(payload).subscribe({
      next: () => {
        this.showSuccessModal = true;
      },
      error: error => {
        const message =
          typeof error?.error === 'string'
            ? error.error
            : 'Failed to submit request';

        alert(message);
      }
    });
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/user/applied-requests']);
  }

  goBack(): void {
    this.router.navigate(['/user/view-schemes']);
  }
}