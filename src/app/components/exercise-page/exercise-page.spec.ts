import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePage } from './exercise-page';

describe('ExercisePage', () => {
  let component: ExercisePage;
  let fixture: ComponentFixture<ExercisePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
