import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabIngredientsComponent } from './tab-ingredients.component';

describe('TabIngredientsComponent', () => {
  let component: TabIngredientsComponent;
  let fixture: ComponentFixture<TabIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
