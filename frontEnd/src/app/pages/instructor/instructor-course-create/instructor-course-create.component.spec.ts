import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseCreateComponent } from './instructor-course-create.component';

describe('InstructorCourseCreateComponent', () => {
  let component: InstructorCourseCreateComponent;
  let fixture: ComponentFixture<InstructorCourseCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseCreateComponent]
    });
    fixture = TestBed.createComponent(InstructorCourseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
