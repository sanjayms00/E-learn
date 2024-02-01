import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChapterInterface } from 'src/app/shared/interface/common.interface';
import { CourseFormService } from 'src/app/shared/services/course-form.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';



@Component({
  selector: 'app-edit-course-content',
  templateUrl: './edit-course-content.component.html',
  providers: [ConfirmationService, MessageService]
})
export class EditCourseContentComponent implements OnInit {

  visible: boolean = false;
  position: any = 'center';
  data: ChapterInterface = {
    videoId: '',
    title: '',
    description: '',
    file: undefined,
    oldVideo: ''
  }
  id: string | null = ''
  courseData!: any;
  updatedTitle = ''
  updatedDescription = ''
  course: FormGroup;
  formData = new FormData()
  submit = false;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    public courseFormService: CourseFormService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.course = this.fb.group({
      fields: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.addfields()
    if (this.id) {
      this.courseFormService.editCourseContentData(this.id)
        .subscribe((res) => {
          this.courseData = res[0].videos
          console.log(this.courseData)
          this.formData.append('courseId', String(this.id))
        })
    }
  }


  ///////////////////// methods ////////////////////////////////////

  //update chapter
  updateChapter() {
    if (this.data.title || this.data.description || this.data.file) {
      this.submit = true
      this.formData.append('videoId', String(this.data.videoId))
      this.formData.append('oldVideo', String(this.data.oldVideo))
      this.formData.append('title', String(this.data.title))
      this.formData.append('description', String(this.data.description))
      this.closeDialog()
      this.courseFormService.updateCourseChapter(this.formData).subscribe((res: any) => {
        console.log(res)
        this.submit = false
        this.courseData = res[0].videos
        this.formData = new FormData();
        this.formData.append('courseId', String(this.id))
        // this.closeDialog()
        this.toastr.success("chapter Updated")

        // this.router.navigate(['/instructor/edit/content', this.id])
      })
    }
  }

  get fields() {
    return (this.course.get('fields') as FormArray)
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

  createChapters() {
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

      this.courseFormService.updateCourseContent(this.formData)
        .subscribe({
          next: (res) => {
            this.courseData = res[0].videos
            this.submit = false
            this.toastr.success('Course content added')
            const newFieldsArray = this.fb.array([]);
            this.course?.setControl('fields', newFieldsArray);
            this.addfields()
            this.formData = new FormData()
            this.formData.append('courseId', String(this.id))
            if (this.fileInput) {
              this.fileInput.nativeElement.value = '';
            }
          },
          error: (err) => {
            this.toastr.error(err.message)
          }
        })
    }
  }

  showDialog(position: string, data: any) {
    this.data.videoId = data._id
    this.data.oldVideo = data.file
    this.data.title = data.title
    this.data.description = data.description
    // this.data.file = data.file
    this.position = position;
    this.visible = true;
  }

  //close dialogue box
  closeDialog() {
    this.visible = false;
    this.data.description = '';
    this.data.videoId = '';
    this.data.oldVideo = '';
    this.data.title = '';
    this.data.file = null;
  }

  //one chapter video change
  onChapterVideoChange(event: any): void {
    const file = event.target.files[0];
    this.data.file = file
    this.formData.append('files', file)
  }

  //delete a chapter
  deleteChapter(): void {
    if (this.id) {
      this.courseFormService.deleteChapter(this.data.videoId).subscribe(res => {
        // console.log(res)
        this.courseData = res[0]?.videos
        this.toastr.success('Chapter deleted')
        this.closeDialog()
      }, (err) => {
        this.toastr.error(err.message)
      })
    }

  }

  //file change multiple
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


  //popup delete confirmation
  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.deleteChapter()
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }




}