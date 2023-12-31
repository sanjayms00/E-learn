import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit {
  selectedImageFile!: File;
  selectedVideoFile!: File;
  categoryData: categoryInterface[] = []
  courseForm: FormGroup;
  isLoading = false;
  imageType = ['image/png', 'image/jpeg', 'image/avif']
  videoType = ['video/mp4']


  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      // tags: ['', Validators.required],
      // level: ['', Validators.required],
      // imageFile: [null, Validators.required],
      // videoFile: [null, Validators.required],
    })

  }

  ngOnInit(): void {
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
    })
  }

  onVideoFileSelected(event: any) {
    const fileType = event.target.files[0].type;

    if (this.videoType.find(item => item === fileType)) {
      this.selectedVideoFile = event.target.files[0];
      console.log(this.selectedVideoFile)
    } else {
      this.toastr.error("select correct file")
    }

  }

  onImageFileSelected(event: any) {
    const fileType = event.target.files[0].type;
    console.log(fileType)
    if (this.imageType.find(item => item === fileType)) {
      this.selectedImageFile = event.target.files[0];
      console.log(this.selectedImageFile)
    } else {
      this.toastr.error("select correct file")
    }

  }

  CourseUpload() {

    if (this.courseForm.valid) {
      this.isLoading = true
      const courseData = this.courseForm.value
      const formData = new FormData();
      formData.append('videoFile', this.selectedVideoFile);
      formData.append('imageFile', this.selectedImageFile);
      formData.append('courseName', courseData.courseName)
      formData.append('description', courseData.description)
      formData.append('category', courseData.category)
      formData.append('price', courseData.price)
      formData.append('estimatedPrice', courseData.estimatedPrice)

      this.courseService.uploadCourse(formData).subscribe(
        (res) => {
          console.log(res)
          this.toastr.success("Course created")
          this.router.navigate(['/instructor/courses'])
          this.isLoading = false
        },
        (err) => {
          this.toastr.error(err.error?.error + " " + err.error?.message)
          this.isLoading = false
        })
    } else {
      this.toastr.error("Unable to process the request, Fill all the necessary Fields")
    }
  }
}
