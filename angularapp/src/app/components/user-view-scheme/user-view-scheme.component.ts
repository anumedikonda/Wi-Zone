import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

@Component({
  selector: 'app-user-view-scheme',
  templateUrl: './user-view-scheme.component.html',
  styleUrls: ['./user-view-scheme.component.css']
})
export class UserViewSchemeComponent implements OnInit {

  schemes: WifiScheme[] = [];
  appliedSchemeIds: number[] = [];
  regions: string[] = [];

  searchTerm = '';
  selectedRegion = '';

  constructor(
    private readonly schemeService: WifiSchemeService,
    private readonly requestService: WifiSchemeRequestService,
    private readonly router: Router,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadSchemes();
    this.loadAppliedRequests();
  }

  loadSchemes(): void {
    this.loaderService.show();   // 👈 loader ON

    this.schemeService.getAllWiFiSchemes().subscribe({
      next: schemes => {
        this.schemes = schemes;

        this.regions = [
          ...new Set(
            schemes.map(scheme => scheme.region)
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

  loadAppliedRequests(): void {
    const userId = Number(
      localStorage.getItem('userId')
    );

    this.loaderService.show();   // 👈 loader ON

    this.requestService
      .getWiFiRequestsByUserId(userId)
      .subscribe({
        next: requests => {
          this.appliedSchemeIds = requests.map(
            request => request.wifiSchemeId
          );

          this.loaderService.hide();   // 👈 loader OFF (success)
        },
        error: () => {
          this.appliedSchemeIds = [];
          this.loaderService.hide();   // 👈 loader OFF (error)
        }
      });
  }

  filteredSchemes(): WifiScheme[] {
    return this.schemes.filter(scheme => {
      const term = this.searchTerm.toLowerCase();

      const matchesTerm =
        !term ||
        scheme.schemeName
          .toLowerCase()
          .includes(term) ||
        scheme.description
          .toLowerCase()
          .includes(term) ||
        scheme.region
          .toLowerCase()
          .includes(term);

      const matchesRegion =
        !this.selectedRegion ||
        scheme.region === this.selectedRegion;

      return matchesTerm && matchesRegion;
    });
  }

  isApplied(
    schemeId: number | undefined
  ): boolean {
    if (schemeId === undefined) {
      return false;
    }

    return this.appliedSchemeIds.includes(
      schemeId
    );
  }

  apply(
    schemeId: number | undefined
  ): void {
    if (schemeId === undefined) {
      return;
    }

    this.router.navigate([
      '/user/apply-request',
      schemeId
    ]);
  }
}