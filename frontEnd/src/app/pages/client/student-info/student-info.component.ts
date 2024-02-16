import { Component, DestroyRef, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { studentInterface } from 'src/app/shared/interface/common.interface';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { constant } from 'src/app/core/constant/constant';
import { clientLoginSuccess } from 'src/app/shared/store/actions/client.action';


@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit, OnDestroy {

  profile !: studentInterface
  profileSubscription !: Subscription
  visible = false
  profileForm!: FormGroup
  imageChangedEvent: any = '';
  croppedImage!: any
  noImage = constant.noProfile

  formData = new FormData()
  @ViewChild('file') fileInput!: ElementRef;


  constructor(
    private store: Store<appState>,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService,
    private destroyRef: DestroyRef
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.profileSubscription = this.store.select(getclient)
      .subscribe({
        next: res => {
          this.profile = res
          this.setProfileInfo()
        },
        error: err => {
          this.toastr.error(err.message)
        }
      })

    if (this.profile.image) {
      this.getProfileImage()
    }
  }

  getProfileImage() {
    this.profileService.studentprofileImage(this.profile.image).subscribe(res => {
      this.noImage = res.profileImage
    })
  }


  showDialog() {
    this.visible = true;
  }

  setProfileInfo() {
    this.profileForm.patchValue({
      fullName: this.profile.fullName,
      mobile: this.profile.mobile,
      email: this.profile.email
    });
  }


  profileUpdate() {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value


      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key)

        if (control instanceof FormControl) {
          this.formData.append(key, control.value)
        }
      })

      this.profileService.updateProfile(this.formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.profile = res.studentData
            this.store.dispatch(clientLoginSuccess({ user: res.studentData }))

            if (res.imageSignedUrl) {
              this.noImage = res.imageSignedUrl
            }

            this.formData = new FormData();
            localStorage.setItem('clientData', JSON.stringify(res.studentData))
            this.toastr.success("Profile updated")
            this.imageChangedEvent = null;
            this.croppedImage = null;
            this.clearFileInput();
          },
          error: err => {

            this.toastr.error(err.message)
            this.formData = new FormData();
            this.imageChangedEvent = null;
            this.croppedImage = null;
            this.clearFileInput();
          }
        })
      this.visible = false;

    } else {
      this.toastr.error('fill all the fields')
    }
  }


  clearFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');

    this.formData.delete('image');

    if (event.blob) {
      this.formData.append('image', event.blob, 'cropped_image.png');
    }
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }


  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
  }

}
