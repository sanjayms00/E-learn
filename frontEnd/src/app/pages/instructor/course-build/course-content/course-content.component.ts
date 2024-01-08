import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {

  contentForm!: FormGroup;

  constructor(
    public courseFormService: CourseFormService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.contentForm = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addfields();
    console.log(JSON.stringify(this.courseFormService.formData))
    if (Object.keys(this.courseFormService.course.information).length === 0) {
      this.router.navigateByUrl('/instructor/create/information')
    }
  }

  //submit
  contentFormSubmit() {
    if (this.contentForm.valid) {
      const formData = this.courseFormService.formData
      this.courseFormService.course.content = this.contentForm.value
      const fields = this.contentForm.get('fields') as FormArray;
      fields.controls.forEach((field, index) => {
        const fieldGroup = field as FormGroup;
        Object.entries(fieldGroup.value).forEach(([key, value]) => {
          formData.append(`fields[${index}][${key}]`, String(value));
        });
      });

      this.router.navigateByUrl('/instructor/create/preview')
    }
  }



  get fields() {
    return (this.contentForm.get('fields') as FormArray)
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

  //file change
  onFileChange(event: Event, index: number) {

    const fileInput = event.target as HTMLInputElement;
    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        this.courseFormService.formData.append('files', file);
        const fieldsArray = this.contentForm.get('fields') as FormArray;
        const fieldGroup = fieldsArray.at(index) as FormGroup;
        fieldGroup.get('files')?.patchValue(file);
      }
    }

  }





}



