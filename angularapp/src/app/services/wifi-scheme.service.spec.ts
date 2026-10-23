import { TestBed } from '@angular/core/testing';

import { WifiSchemeService } from './wifi-scheme.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WifiSchemeService', () => {
  let service: WifiSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WifiSchemeService);
  });

  fit('Frontend_should_create_wifischeme_service', () => {
    expect(service).toBeTruthy();
  });
});
