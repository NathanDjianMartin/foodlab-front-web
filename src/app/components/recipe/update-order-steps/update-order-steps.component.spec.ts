import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderStepsComponent } from './update-order-steps.component';

describe('UpdateOrderStepsComponent', () => {
  let component: UpdateOrderStepsComponent;
  let fixture: ComponentFixture<UpdateOrderStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
