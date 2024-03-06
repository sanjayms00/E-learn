import { CourseFormService } from '../../../shared/services/course-form.service';
import { Component, ViewChild, ElementRef, OnInit, DestroyRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryInterface } from '../../../shared/interface/common.interface';
import { CategoryService } from '../../../core/services/admin/category.service';
import { IDeactivateComponent } from '../../../shared/guards/form-leave.guard';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { noSpaceAllowed } from 'src/app/shared/validators/noSpace.validator';




@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit, IDeactivateComponent {

  @ViewChild('previewImage') previewImage!: ElementRef;
  course: FormGroup;
  categoryData: categoryInterface[] = []
  value: string | undefined;
  imageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  videoTypes = ['video/mp4'];
  trailerTypes = ['video/mp4'];
  submit = false;
  formData = new FormData()

  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private destroyRef: DestroyRef
  ) {

    this.course = this.fb.group({
      courseName: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(10), noSpaceAllowed]],
      courseDescription: [null, [Validators.required, Validators.maxLength(1000), Validators.minLength(100), noSpaceAllowed]],
      content: [null, Validators.required, noSpaceAllowed],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      courseTags: [null, [Validators.required, Validators.maxLength(100)]],
      courseLevel: [null, Validators.required],
      files: [null, Validators.required],
      trailer: [null, Validators.required],
      fields: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.addfields();
    this.categoryService.getActiveCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.categoryData = res
        },
        error: err => {
          console.log(err)
        }
      })
  }

  get fields() {
    return (this.course.get('fields') as FormArray)
  }

  addfields() {
    this.fields.push(this.fb.group({
      videoTitle: [null, Validators.required],
      videoDescription: [null, Validators.required],
      files: [null, Validators.required],
    }));
  }

  //submit the form
  createCourseSubmit() {
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

      this.courseFormService.createCourse(this.formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            console.log(res)
            this.toastr.success('Course created')
            this.router.navigateByUrl('instructor/courses')
          },
          error: err => {
            this.toastr.error(err.message)
          }
        })
    } else {
      this.toastr.error("Fill all fields")
    }
  }

  onFileChange(event: Event, index: number) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        if (this.videoTypes.find(item => item === file.type)) {
          this.formData.append('files', file);
          const fieldsArray = this.course.get('fields') as FormArray;
          const fieldGroup = fieldsArray.at(index) as FormGroup;
          fieldGroup.get('files')?.patchValue(file);
        } else {
          this.toastr.error("The video format is not supported")
          const fieldsArray = this.course.get('fields') as FormArray;
          const fieldGroup = fieldsArray.at(index) as FormGroup;
          fieldGroup.get('files')?.patchValue(null);
        }
      }
    }
  }

  removeFileds(index: number) {
    this.fields.removeAt(index)
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    if (this.imageTypes.find(item => item === file.type)) {

      this.formData.append('files', file);
    } else {
      this.toastr.error("File not supported")
      this.course.get('files')?.patchValue(null)
    }
  }

  onTrailerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    if (this.trailerTypes.find(item => item === file.type)) {

      this.formData.append('trailer', file);
    } else {
      this.toastr.error("File not supported")
      this.course.get('trailer')?.patchValue(null)
    }
  }


  getFieldError(index: number, fieldName: string): string {
    const field = this.fields.at(index);
    const control = field.get(fieldName);

    if (control?.invalid && (control.dirty || control.touched)) {
      if (fieldName === 'videoTitle' && control?.errors?.['required']) {
        return 'Title is required.';
      }
      if (fieldName === 'videoDescription' && control?.errors?.['required']) {
        return 'Message is required.';
      }
      if (fieldName === 'files' && control?.errors?.['required']) {
        return 'Video is required.';
      }
    }

    return '';
  }


  canExit() {
    if (this.course.dirty && !this.submit) {
      return confirm("You have unsaved changes, Do you want to navigate away?")
    }
    return true
  }

}
