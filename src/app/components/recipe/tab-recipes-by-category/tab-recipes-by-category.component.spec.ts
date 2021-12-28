import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabRecipesByCategoryComponent } from './tab-recipes-by-category.component';

describe('TabRecipesByCategoryComponent', () => {
  let component: TabRecipesByCategoryComponent;
  let fixture: ComponentFixture<TabRecipesByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabRecipesByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabRecipesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
