import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Editor } from 'primeng/editor';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { IDeactivateComponent } from 'src/app/shared/guards/form-leave.guard';
import { categoryInterface, instructorCourse } from 'src/app/shared/interface/common.interface';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html'
})
export class EditCourseComponent implements OnInit, IDeactivateComponent {

  course: FormGroup;
  categoryData!: categoryInterface[]
  imageType = ['image/png', 'image/jpeg']
  trailerTypes = ['video/mp4'];
  submit = false;
  formData = new FormData()
  courseData!: instructorCourse
  id: string | null = ''
  activeVideo: string | null = null;

  @ViewChild('editor') editor!: Editor;
  @ViewChild('thumbnail') thumbnail!: ElementRef;



  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {

    this.course = this.fb.group({
      courseName: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]],
      courseDescription: [null, [Validators.required, Validators.maxLength(1000), Validators.minLength(100)]],
      content: ['', Validators.required],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      courseTags: [null, [Validators.required, Validators.maxLength(100)]],
      courseLevel: [null, Validators.required],
      files: [null],
      trailer: [null]
    })
  }


  ngOnInit(): void {
    this.getCategories()
    this.getCourseData()
  }

  getCourseData() {
    //get id from params
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.courseFormService.editCourseData(this.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(
          {
            next: (courseData) => {
              this.courseData = courseData
              this.course.patchValue({
                courseName: courseData.courseName,
                courseDescription: courseData.description,
                content: courseData.content,
                courseCategory: courseData.categoryId,
                coursePrice: courseData.price,
                courseTags: courseData.courseTags,
                courseLevel: courseData.courseLevel
              });

              this.activeVideo = courseData.trailer

              this.formData.append('id', String(this.id));
              this.formData.append('oldImage', String(this.courseData.thumbnail));
              this.formData.append('oldTrailer', String(this.courseData.trailer));
            },
            error: err => {
              this.toastr.error("unable to show the course Data " + err,)
            }
          })
    }
  }


  getCategories() {
    this.categoryService.getActiveCategories()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: res => {
        this.categoryData = res
      },
      error: err => {
        this.toastr.error(err.message)
      }
    })
  }

  //submit the form
  editCourseSubmit() {
    // console.log(this.course.value)

    if (this.course.valid) {
      this.submit = true
      // Append course information
      const formValue = this.course.getRawValue();

      Object.entries(formValue).forEach(([key, value]) => {
        if (Array.isArray(value) || typeof value === 'object') {
          this.formData.append(key, JSON.stringify(value));
        } else {
          this.formData.append(key, String(value));
        }
      });

      this.courseFormService.updateCourse(this.formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.toastr.success('Course information updated')
            this.router.navigateByUrl('instructor/courses')
          },
          error: err => {
            this.toastr.error(err.message)
          }
        })
    } else {
      this.toastr.error('fill all fields')
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


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    if (this.imageType.find(item => item === file.type)) {

      this.formData.append('files', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.thumbnail.nativeElement.src = e.target.result.toString();
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error("File not supported")
    }
  }


  onTrailerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    if (this.trailerTypes.find(item => item === file.type)) {
      this.formData.append('trailer', file);
    } else {
      this.toastr.error("File not supported")
    }
  }

  canExit() {
    if ((this.course.dirty) && !this.submit) {
      return confirm("You have unsaved changes, Do you want to navigate away?")
    }
    return true
  }


  courseLevelCheck(value: string) {
    return this.courseData && this.courseData.courseLevel && this.courseData.courseLevel.includes(value);
  }
  
}

