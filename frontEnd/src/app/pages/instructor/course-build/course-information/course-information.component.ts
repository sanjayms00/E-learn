
import { CourseFormService } from 'src/app/shared/services/course-form.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css'],
})
export class CourseInformationComponent {

  @ViewChild('previewImage') previewImage!: ElementRef;
  courseInformation: FormGroup;
  videoThumbnail!: File
  imageType = ['image/png', 'image/jpeg']
  submit = false;

  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.courseInformation = this.fb.group({
      courseName: [null, [Validators.required, Validators.maxLength(100)]],
      courseDescription: ['', Validators.required],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.min(1)]],
      estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      courseTags: ['', Validators.required],
      courseLevel: ['', Validators.required],
    })
  }

  InformationSubmit() {
    if (this.courseInformation.valid)
      this.courseFormService.course.information = {
        ...this.courseFormService.course.information,
        ...this.courseInformation.value
      }
    console.log(this.courseFormService.course.information)
    this.router.navigateByUrl('/instructor/courses/content')
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
      this.courseFormService.course.information = {
        videoThumbnail: file
      }
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
