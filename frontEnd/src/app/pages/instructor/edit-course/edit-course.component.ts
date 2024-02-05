import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { IDeactivateComponent } from 'src/app/shared/guards/instructor/form-leave.guard';
import { Course, categoryInterface, instructorCourse } from 'src/app/shared/interface/common.interface';
import { CourseFormService } from 'src/app/shared/services/course-form.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html'
})
export class EditCourseComponent implements OnInit, IDeactivateComponent {

  @ViewChild('previewImage') previewImage!: ElementRef;
  course: FormGroup;
  url = environment.cloudFrontUrl
  categoryData: categoryInterface[] = []
  imageType = ['image/png', 'image/jpeg']
  trailerTypes = ['video/mp4'];
  submit = false;
  formData = new FormData()
  courseData!: instructorCourse[]
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
      courseName: [null, Validators.required],
      courseDescription: [null, Validators.required],
      content: [null, Validators.required],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      courseTags: [null, Validators.required],
      courseLevel: [null, Validators.required],
      files: [null],
      // fields: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    // this.addfields();
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
    })
    //get id from params
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.courseFormService.editCourseData(this.id).subscribe((courseData) => {
        this.courseData = courseData
        console.log(this.courseData)


        this.course.patchValue({
          courseName: courseData[0].courseName,
          courseDescription: courseData[0].description,
          content: courseData[0].content,
          courseCategory: courseData[0].categoryId,
          coursePrice: courseData[0].price,
          courseTags: courseData[0].courseTags,
          courseLevel: courseData[0].courseLevel,
          files: [courseData[0].thumbnail],
          trailer: [courseData[0].trailer],
        });

        this.formData.append('id', String(this.id));
        this.formData.append('oldImage', String(this.courseData[0].thumbnail));

        this.url += this.courseData[0].thumbnail

      }),
        (error: any) => {
          // Handle error, e.g., show a toast message
          console.error('Error fetching course data:', error);
        }
    }
  }



  // loadImage(path: string) {
  //   const preview = this.previewImage.nativeElement as HTMLImageElement;
  //   preview.src = path
  // }

  //submit the form
  editCourseSubmit() {
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

      this.courseFormService.updateCourse(this.formData).subscribe(res => {
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
    if (this.imageType.find(item => item === file.type)) {

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

}

