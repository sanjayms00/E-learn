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
  ) { }


  ngOnInit(): void {
    this.contentForm = this.fb.group({
      fields: this.fb.array([]),
    });
  }

  get fields() {
    return (this.contentForm.get('fields') as FormArray)
  }


  addfields() {
    this.fields.push(this.fb.group({
      videoTitle: [null, Validators.required],
      videoDescription: [null, Validators.required],
      videoFile: [null, Validators.required],
    }));
  }


  removeFileds(index: number) {
    this.fields.removeAt(index)
  }


  onFileChange(event: Event, index: number) {

    const fileInput = event.target as HTMLInputElement;
    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        const fieldsArray = this.contentForm.get('fields') as FormArray;
        const fieldGroup = fieldsArray.at(index) as FormGroup;
        fieldGroup.get('videoFile')?.patchValue(file);
      }
    }

  }


  contentFormSubmit() {
    this.courseFormService.course.content = this.contentForm.value
    this.router.navigateByUrl('/instructor/create/preview')
  }


}



