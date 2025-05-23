import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserElementsComponent } from './user-elements.component';

describe('UserElementsComponent', () => {
  let component: UserElementsComponent;
  let fixture: ComponentFixture<UserElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserElementsComponent]
    });
    fixture = TestBed.createComponent(UserElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
