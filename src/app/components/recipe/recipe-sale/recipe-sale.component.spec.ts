import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSaleComponent } from './recipe-sale.component';

describe('RecipeSaleComponent', () => {
  let component: RecipeSaleComponent;
  let fixture: ComponentFixture<RecipeSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
