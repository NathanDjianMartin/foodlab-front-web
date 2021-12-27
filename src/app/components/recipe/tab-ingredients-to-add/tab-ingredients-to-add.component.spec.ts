import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabIngredientsToAddComponent } from './tab-ingredients-to-add.component';

describe('TabIngredientsToAddComponent', () => {
  let component: TabIngredientsToAddComponent;
  let fixture: ComponentFixture<TabIngredientsToAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabIngredientsToAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabIngredientsToAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
