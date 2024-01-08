
import { CourseFormService } from 'src/app/shared/services/course-form.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { categoryInterface } from 'src/app/shared/interface/common.interface';
import { CategoryService } from 'src/app/core/services/admin/category.service';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css'],
})
export class CourseInformationComponent implements OnInit {

  @ViewChild('previewImage') previewImage!: ElementRef;
  courseInformation: FormGroup;
  categoryData: categoryInterface[] = []
  imageType = ['image/png', 'image/jpeg']
  submit = false;

  constructor(
    public courseFormService: CourseFormService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {

    this.courseInformation = this.fb.group({
      courseName: [null, Validators.required],
      courseDescription: [null, Validators.required],
      courseCategory: ['', Validators.required],
      coursePrice: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(2), Validators.maxLength(4)]],
      // estimatedPrice: [null, [Validators.required, Validators.min(1)]],
      courseTags: [null, Validators.required],
      courseLevel: [null, Validators.required],
      files: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.getActiveCategories().subscribe(res => {
      this.categoryData = res
    })
  }

  InformationSubmit() {
    if (this.courseInformation.valid) {
      this.courseFormService.course.information = this.courseInformation.value
      const formData = this.courseFormService.formData

      // Append course information
      Object.entries(this.courseInformation.value).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      //this.courseFormService.course.information = this.courseInformation.value
      this.router.navigateByUrl('/instructor/create/content')
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

      this.courseFormService.formData.append('files', file);
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
