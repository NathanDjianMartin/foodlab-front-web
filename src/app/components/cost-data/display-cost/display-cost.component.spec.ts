import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCostComponent } from './display-cost.component';

describe('DisplayCostComponent', () => {
  let component: DisplayCostComponent;
  let fixture: ComponentFixture<DisplayCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
