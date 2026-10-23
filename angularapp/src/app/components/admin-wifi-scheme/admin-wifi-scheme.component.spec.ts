import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWifiSchemeComponent } from './admin-wifi-scheme.component';

describe('AdminWifiSchemeComponent', () => {
  let component: AdminWifiSchemeComponent;
  let fixture: ComponentFixture<AdminWifiSchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminWifiSchemeComponent]
    });
    fixture = TestBed.createComponent(AdminWifiSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
