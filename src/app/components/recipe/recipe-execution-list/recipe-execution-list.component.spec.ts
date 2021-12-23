import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeExecutionListComponent } from './recipe-execution-list.component';

describe('RecipeExecutionListComponent', () => {
  let component: RecipeExecutionListComponent;
  let fixture: ComponentFixture<RecipeExecutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeExecutionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeExecutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
