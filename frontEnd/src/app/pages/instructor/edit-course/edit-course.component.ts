import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseForm!: FormGroup;
  categoryData: categoryInterface[] = []
  categoryId: string = '';
  courseId: string = '';
  thumbnail = constant.thumbnail
  image: string = ''
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private CourseService: CourseService,
    private route: ActivatedRoute,
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
      courseId: [null]
      // thumbnail: [null]
    });
  }

  ngOnInit(): void {

    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
    })

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.CourseService.editCourseData(id).subscribe((courseData) => {

        console.log(courseData)

        if (courseData.categoryId) {
          this.categoryId = courseData.categoryId
        }
        this.image = courseData.thumbnail

        this.courseForm.patchValue({
          courseName: courseData.courseName,
          description: courseData.description,
          category: courseData.categoryId,
          price: courseData.price,
          estimatedPrice: courseData.estimatedPrice,
          courseId: courseData._id
          // thumbnail: courseData.thumbnail
        })
      })
    }
  }

  updateCourse() {
    if (this.courseForm.valid) {

      // const formData = new FormData();
      // formData.append('videoFile', this.selectedVideoFile);
      // formData.append('imageFile', this.selectedImageFile);
      // formData.append('courseName', courseData.courseName)
      // formData.append('description', courseData.description)
      // formData.append('category', courseData.category)
      // formData.append('price', courseData.price)
      // formData.append('estimatedPrice', courseData.estimatedPrice)
      // formData.append('courseId', this.courseId)

      const courseData = this.courseForm.value
      this.CourseService.updateCourse(courseData).subscribe(
        (res) => {
          this.toastr.success("Course Updated")
          this.router.navigate(['/instructor/courses'])
          this.isLoading = false
        },
        (err) => {
          this.toastr.error(err.error?.error + " " + err.error?.message)
          this.isLoading = false
        })
    }

  }
}

