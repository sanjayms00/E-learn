import { Component, OnInit, inject } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';
import { environment } from 'src/environment/environment';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  providers: [ConfirmationService, MessageService]
})
export class InstructorCoursesComponent implements OnInit {

  courses: Course[] = []
  url = environment.cloudFrontUrl

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.instructorCourse()
  }

  instructorCourse() {
    this.courseService.getInstructorCourse().subscribe((res: any) => {
      this.courses = res
    })
  }

  //delete course
  deleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe((res) => {
      this.courses = res
      // console.log(res)
      this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
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
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


}
