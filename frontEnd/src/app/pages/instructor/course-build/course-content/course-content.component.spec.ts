import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentComponent } from './CourseContentComponent';

describe('CourseContentComponent', () => {
  let component: CourseContentComponent;
  let fixture: ComponentFixture<CourseContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseContentComponent]
    });
    fixture = TestBed.createComponent(CourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
