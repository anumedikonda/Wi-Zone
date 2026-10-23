import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WifiSchemeRequestService } from './wifi-scheme-request.service';

describe('WifiSchemeRequestService', () => {
  let service: WifiSchemeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WifiSchemeRequestService);
  });

  fit('Frontend_should_create_wifischemerequest_service', () => {
    expect(service).toBeTruthy();
  });
});
