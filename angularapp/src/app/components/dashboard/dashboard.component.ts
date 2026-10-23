import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { WifiSchemeService } from 'src/app/services/wifi-scheme.service';
import { WifiSchemeRequestService } from 'src/app/services/wifi-scheme-request.service';
import { WifiScheme } from 'src/app/models/wifi-scheme.model';
import { WifiSchemeRequest } from 'src/app/models/wifi-scheme-request.model';
import { LoaderService } from 'src/app/services/loader.service';   // 👈 1. IMPORT

interface RegionSummary {
  region: string;
  topScheme: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  schemes: WifiScheme[] = [];
  requests: WifiSchemeRequest[] = [];
  regionWiseSchemes: RegionSummary[] = [];

  totalSchemes = 0;
  availableCount = 0;
  unavailableCount = 0;
  availablePercent = 0;
  unavailablePercent = 0;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly schemeService: WifiSchemeService,
    private readonly requestService: WifiSchemeRequestService,
    private readonly loaderService: LoaderService   // 👈 2. INJECT
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.loaderService.show();   // 👈 loader ON (chain start)

    this.schemeService.getAllWiFiSchemes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (schemes) => {
          this.schemes = schemes;
          this.calculateStats(schemes);
          this.loadRequests();   // 👈 next call chain me — ye hide karega
        },
        error: () => {
          this.schemes = [];
          this.loaderService.hide();   // 👈 loader OFF (schemes fail — chain ruk gayi)
        }
      });
  }

  private loadRequests(): void {
    this.requestService.getAllWiFiRequests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reqs) => {
          this.requests = reqs;
          this.regionWiseSchemes = this.calculateRegionWise(reqs);
          this.loaderService.hide();   // 👈 loader OFF (chain complete)
        },
        error: () => {
          this.regionWiseSchemes = [];
          this.loaderService.hide();   // 👈 loader OFF (error)
        }
      });
  }

  private calculateStats(schemes: WifiScheme[]): void {
    const total = schemes.length;
    const available = schemes.filter(s => s.availabilityStatus === 'Available').length;

    this.totalSchemes = total;
    this.availableCount = available;
    this.unavailableCount = total - available;
    this.availablePercent = this.toPercent(available, total);
    this.unavailablePercent = this.toPercent(total - available, total);
  }

  private toPercent(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  private calculateRegionWise(requests: WifiSchemeRequest[]): RegionSummary[] {
    const regionMap = new Map<string, Map<string, number>>();

    requests.forEach(r => {
      const region = r.wifiScheme?.region;
      const scheme = r.wifiScheme?.schemeName;
      if (!region || !scheme) {
        return;
      }

      const schemeCounts = regionMap.get(region) ?? new Map<string, number>();
      schemeCounts.set(scheme, (schemeCounts.get(scheme) ?? 0) + 1);
      regionMap.set(region, schemeCounts);
    });

    return Array.from(regionMap.entries()).map(([region, schemeCounts]) => ({
      region,
      topScheme: this.findTopScheme(schemeCounts),
      count: this.sumCounts(schemeCounts)
    }));
  }

  private findTopScheme(schemeCounts: Map<string, number>): string {
    return Array.from(schemeCounts.entries())
      .reduce((top, current) => (current[1] > top[1] ? current : top))[0];
  }

  private sumCounts(schemeCounts: Map<string, number>): number {
    return Array.from(schemeCounts.values()).reduce((sum, count) => sum + count, 0);
  }
}