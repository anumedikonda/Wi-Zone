import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewSchemeComponent } from './user-view-scheme.component';

describe('UserViewSchemeComponent', () => {
  let component: UserViewSchemeComponent;
  let fixture: ComponentFixture<UserViewSchemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewSchemeComponent]
    });
    fixture = TestBed.createComponent(UserViewSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
