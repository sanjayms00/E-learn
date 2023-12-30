import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  selectedImageFile!: File;
  selectedVideoFile!: File;
  categoryData: categoryInterface[] = []
  courseForm:FormGroup

  constructor(
      private fb: FormBuilder,
      private courseService: CourseService,
      private categoryService: CategoryService
    ) {
      this.courseForm = this.fb.group({
        CourseName: ['', Validators.required],
        courseDescription: ['', Validators.required],
        category: ['', Validators.required],
        coursePrice: [null, [Validators.required, Validators.min(1)]],
        estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      })
  }

  ngOnInit(): void {
    this.categoryService.getActiveCategories().subscribe(res=>{
      this.categoryData = res
    })
  }




  onVideoFileSelected(event: any) {
    const fileType = event.target.files[0].type;
    console.log(fileType)
    if(fileType === 'video/mp4'){
      this.selectedVideoFile = event.target.files[0];
      console.log(this.selectedVideoFile)
    }else{
      alert("select correct file")
    }
    
  }

  onImageFileSelected(event: any) {
    const fileType = event.target.files[0].type;
    console.log(fileType)
    if(fileType === 'image/png'){
      this.selectedImageFile = event.target.files[0];
      console.log(this.selectedImageFile)
    }else{
      alert("select correct file")
    }
    
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
