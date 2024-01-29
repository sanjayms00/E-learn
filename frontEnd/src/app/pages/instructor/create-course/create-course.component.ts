import { CourseFormService } from 'src/app/shared/services/course-form.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryInterface } from 'src/app/shared/interface/common.interface';
import { CategoryService } from 'src/app/core/services/admin/category.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {

  @ViewChild('previewImage') previewImage!: ElementRef;
  course: FormGroup;
  categoryData: categoryInterface[] = []

  imageTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp'];

  videoTypes = ['video/mp4'];

  submit = false;
  formData = new FormData()

  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {

    this.course = this.fb.group({
      courseName: [null, Validators.required],
      courseDescription: [null, Validators.required],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      // estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      courseTags: [null, Validators.required],
      courseLevel: [null, Validators.required],
      files: [null, Validators.required],
      fields: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.addfields();
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
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

      this.courseFormService.createCourse(this.formData).subscribe(res => {
        console.log(res)
        this.toastr.success('Course created')
        this.router.navigateByUrl('instructor/courses')
      }, (err) => {
        this.toastr.error(err.message)
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
        }
        else {
          this.toastr.error("File not supported")
        }
      }
    }

  }

  removeFileds(index: number) {
    this.fields.removeAt(index)
  }

  // for image preview
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.updateDropzoneStyles(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.updateDropzoneStyles(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.updateDropzoneStyles(false);

    const file = (event.dataTransfer?.files as FileList)[0];
    this.displayPreview(file);
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];
    if (this.imageTypes.find(item => item === file.type)) {

      this.formData.append('files', file);
      this.displayPreview(file);
    } else {
      this.toastr.error("File not supported")
    }
  }

  displayPreview(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const preview = this.previewImage.nativeElement as HTMLImageElement;
      preview.src = reader.result as string;
      preview.classList.remove('hidden');
    };
  }

  private updateDropzoneStyles(isOver: boolean): void {
    const dropzone = document.getElementById('dropzone');
    if (isOver) {
      dropzone?.classList.add('border-indigo-600');
    } else {
      dropzone?.classList.remove('border-indigo-600');
    }
  }


}
