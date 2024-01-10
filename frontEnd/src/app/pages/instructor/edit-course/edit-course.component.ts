import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { Course, categoryInterface, instructorCourse } from 'src/app/shared/interface/common.interface';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  @ViewChild('previewImage') previewImage!: ElementRef;
  course: FormGroup;
  categoryData: categoryInterface[] = []
  imageType = ['image/png', 'image/jpeg']
  submit = false;
  formData = new FormData()
  courseData!: instructorCourse
  thumbnail = constant.thumbnail

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
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      courseTags: [null, Validators.required],
      courseLevel: [null, Validators.required],
      files: [null],
      fields: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.addfields();
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
    })
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseFormService.editCourseData(id).subscribe((courseData) => {
        this.courseData = courseData[0]
        this.course.patchValue({
          courseName: courseData[0].courseName,
          courseDescription: courseData[0].description,
          courseCategory: courseData[0].categoryId,
          coursePrice: courseData[0].price,
          courseTags: courseData[0].courseTags,
          courseLevel: courseData[0].courseLevel,
          files: [this.courseData.thumbnail],
          fields: courseData[0].videos,
        });

        while (this.fields.length !== 0) {
          this.fields.removeAt(0);
        }

        this.courseData.videos.forEach((video) => {
          this.addVideoFields(video);
          console.log(video)
        });

        this.formData.append('id', id);
        this.formData.append('oldImage', this.courseData.thumbnail);
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

  //submit the form
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

