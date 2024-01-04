import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormHeaderComponent } from './course-form-header.component';

describe('CourseFormHeaderComponent', () => {
  let component: CourseFormHeaderComponent;
  let fixture: ComponentFixture<CourseFormHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFormHeaderComponent]
    });
    fixture = TestBed.createComponent(CourseFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
