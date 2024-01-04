import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInformationComponent } from './course-information.component';

describe('CourseInformationComponent', () => {
  let component: CourseInformationComponent;
  let fixture: ComponentFixture<CourseInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseInformationComponent]
    });
    fixture = TestBed.createComponent(CourseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
