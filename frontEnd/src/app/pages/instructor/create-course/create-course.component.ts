import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/core/services/instructor/course.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  selectedImageFile!: File;
  selectedVideoFile!: File;

  courseForm:FormGroup

  constructor(
      private fb: FormBuilder,
      private courseService: CourseService
    ) {
      this.courseForm = this.fb.group({
        CourseName: ['', Validators.required],
        courseDescription: ['', Validators.required],
        category: ['', Validators.required],
        coursePrice: [null, [Validators.required, Validators.min(1)]],
        estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      })
  }

  onVideoFileSelected(event: any) {
    this.selectedVideoFile = event.target.files[0];
    console.log(this.selectedVideoFile)
  }

  onImageFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    console.log(this.selectedImageFile)
  }

  uploadFile() {
    // if(this.courseForm.valid){
      //const otherFormData = this.courseForm.value
    
        const formData = new FormData();
        formData.append('videoFile', this.selectedVideoFile);                           
        formData.append('imageFile', this.selectedImageFile);        

        

        this.courseService.uploadCourse(formData).subscribe(
          (res)=>{
            alert(res)
          },
          (err)=>{
            alert(err.message)
          })
    // }
  }
}
