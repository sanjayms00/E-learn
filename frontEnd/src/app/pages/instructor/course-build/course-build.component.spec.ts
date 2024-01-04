import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBuildComponent } from './course-build.component';

describe('CourseBuildComponent', () => {
  let component: CourseBuildComponent;
  let fixture: ComponentFixture<CourseBuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseBuildComponent]
    });
    fixture = TestBed.createComponent(CourseBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
