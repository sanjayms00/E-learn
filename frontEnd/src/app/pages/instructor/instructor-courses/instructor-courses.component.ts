import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  providers: [ConfirmationService]
})
export class InstructorCoursesComponent implements OnInit {

  courses: Course[] = []
  p: number = 1;

  constructor(
    private confirmationService: ConfirmationService,
    private courseService: CourseService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef
  ) { }


  ngOnInit(): void {
    this.instructorCourse()
  }

  instructorCourse() {
    this.courseService.getInstructorCourse()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.courses = res
      })
  }

  //delete course
  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.courses = res
          this.toastr.success("Record deleted")
        },
        error: err => {
          this.toastr.error(err.message)
        }
      })
  }

  //popup delete confirmation
  confirm2(event: Event, courseId: string,) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteCourse(courseId)
      },
      reject: () => {
        this.toastr.error("You have rejected")
      }
    });
  }

  courseTrackBy(index: number, course: Course) {
    return course._id;
  }
}
