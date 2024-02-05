import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { CourseDetail, initialCourseDetails } from 'src/app/shared/interface/courseDetails.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
})
export class CourseDetailsComponent implements OnInit {

  student: any;
  visible: boolean = false;
  activeVideo: string | null = null;
  url = environment.cloudFrontUrl
  courseDetails: CourseDetail = initialCourseDetails;
  @ViewChild('trailerVideo') trailerVideo!: ElementRef

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private destroyRef: DestroyRef,
    private authSservice: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // this.trailerVideo.nativeElement.focus()
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getStudent();
      this.getCourseData(id);
    } else {
      alert("Unable to show the details")
    }
  }



  showDialog() {
    this.visible = true;
  }

  //fetch course Data
  getCourseData(id: string) {
    this.courseService.courseDetails(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: res => {
            this.courseDetails = res
            // console.log(this.courseDetails.categoryName)
            this.activeVideo = this.courseDetails.trailer
          },
          error: err => {
            this.toastr.error(err)
          }
        })
  }

  //get student Data from local
  getStudent() {
    const studentData = this.authSservice.getLocalClientData()
    if (studentData) {
      this.student = JSON.parse(studentData)
    }
    console.log(this.student._id)
  }

  isStudentEnrolled(): boolean | undefined {
    return this.courseDetails?.students?.includes(this.student._id);
  }


}
