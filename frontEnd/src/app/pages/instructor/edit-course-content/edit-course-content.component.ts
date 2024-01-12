import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryInterface, instructorCourse } from 'src/app/shared/interface/common.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-edit-course-content',
  templateUrl: './edit-course-content.component.html',
  styleUrls: ['./edit-course-content.component.css']
})
export class EditCourseContentComponent implements OnInit {

  course: FormGroup;
  categoryData: categoryInterface[] = []
  imageType = ['image/png', 'image/jpeg']
  submit = false;
  formData = new FormData()
  courseData!: instructorCourse
  id: string | null = ''

  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {

    this.course = this.fb.group({
      fields: this.fb.array([]),
    })
  }


  ngOnInit(): void {
    // this.addfields();
    this.categoryService.getCategories().subscribe(res => {
      this.categoryData = res
    })
    //get id from params
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.courseFormService.editCourseContentData(this.id).subscribe((courseData) => {
        this.courseData = courseData[0]
        this.course.patchValue({
          fields: courseData[0].videos,
        });

        while (this.fields.length !== 0) {
          this.fields.removeAt(0);
        }
        if (this.courseData.videos) {
          this.courseData.videos.forEach((video) => {
            this.addVideoFields(video);
            console.log(video)
          });
        }

        this.formData.append('id', String(this.id));
        this.formData.append('oldVideoData', JSON.stringify(courseData[0].videos));
      }),
        (error: any) => {
          // Handle error, e.g., show a toast message
          console.error('Error fetching course data:', error);
        }
    }
  }


  get fields() {
    return (this.course.get('fields') as FormArray)
  }

  addVideoFields(videoData: any) {
    this.fields.push(this.fb.group({
      videoTitle: [videoData.title, Validators.required],
      videoDescription: [videoData.description, Validators.required],
      files: [null],
    }));
  }

  addfields() {
    this.fields.push(this.fb.group({
      videoTitle: [null, Validators.required],
      videoDescription: [null, Validators.required],
      files: [null, Validators.required],
    }));
  }


  removeFileds(index: number) {
    this.fields.removeAt(index)
  }

  //update content or videos
  editCourseSubmit() {
    if (this.course.valid) {
      // Append course information
      const formValue = this.course.getRawValue();

      Object.entries(formValue).forEach(([key, value]) => {
        if (Array.isArray(value) || typeof value === 'object') {
          this.formData.append(key, JSON.stringify(value));
        } else {
          this.formData.append(key, String(value));
        }
      });

      this.courseFormService.updateCourseContent(this.formData).subscribe(res => {
        console.log(res)
        this.toastr.success('Course created')
        this.router.navigateByUrl('instructor/courses')
      }, (err) => {
        this.toastr.error(err.message)
      })


    }
  }


  onFileChange(event: Event, index: number) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        this.formData.append('files', file);
        const fieldsArray = this.course.get('fields') as FormArray;
        const fieldGroup = fieldsArray.at(index) as FormGroup;
        fieldGroup.get('files')?.patchValue(file);
      }
    }

  }


}
