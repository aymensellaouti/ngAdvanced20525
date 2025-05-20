import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdComponent } from './md.component';

describe('MdComponent', () => {
  let component: MdComponent;
  let fixture: ComponentFixture<MdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MdComponent]
    });
    fixture = TestBed.createComponent(MdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
