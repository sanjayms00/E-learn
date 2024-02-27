
import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { instructorInterface } from '../../../shared/interface/common.interface';
import { appState } from '../../../shared/store/state/app.state';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from '../../../shared/services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getInstructor } from '../../../shared/store/selectors/instructor.selector';
import { constant } from '../../../core/constant/constant';
import { instructorLoginSuccess } from '../../../shared/store/actions/instructor.action';


@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html'
})
export class InstructorProfileComponent implements OnInit {

  profile !: instructorInterface
  profileSubscription !: Subscription
  profileImageSubscription !: Subscription
  visible = false
  profileForm!: FormGroup
  imageChangedEvent: any = '';
  croppedImage: any = '';
  formData = new FormData()
  noprofile = constant.noProfile
  loading = false
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
      email: ['', [Validators.required]],
      headline: ['', [Validators.required]],
      biography: ['', [Validators.required]],
      twitter: ['', [Validators.required]],
      facebook: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      linkedin: ['', [Validators.required]],
      website: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.profileSubscription = this.store.select(getInstructor)
      .subscribe({
        next: res => {
          this.profile = res
          this.setProfileInfo()
        },
        error: err => {
          console.log(err)
        }
      })

    //get profile photo
    if (this.profile.image) {
      this.getProfileImage()
    }
  }

  getProfileImage() {
    this.profileImageSubscription = this.profileService.profileImage(this.profile.image).subscribe(res => {
      this.noprofile = res.profileImage
    })
  }


  showDialog() {
    this.visible = true;
  }

  setProfileInfo() {
    this.profileForm.patchValue({
      fullName: this.profile.fullName,
      mobile: this.profile.mobile,
      email: this.profile.email,
      headline: this.profile.headline,
      biography: this.profile.biography,
      twitter: this.profile.twitter,
      facebook: this.profile.facebook,
      instagram: this.profile.instagram,
      linkedin: this.profile.linkedin,
      website: this.profile.website,
    });
  }

  profileUpdate() {
    if (this.profileForm.valid) {

      this.loading = true

      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key)

        if (control instanceof FormControl) {
          this.formData.append(key, control.value)
        }
      })

      this.profileService.updateInstructorProfile(this.formData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.profile = res.instructorData
            localStorage.setItem('instructorData', JSON.stringify(res.instructorData))

            this.store.dispatch(instructorLoginSuccess({ user: res.instructorData }))

            if (res.imageSignedUrl) {
              this.noprofile = res.imageSignedUrl
            }

            this.toastr.success("profile updated")
            this.loading = false

            this.formData = new FormData();
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
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);

    this.formData.delete('image');

    if (event.blob) {
      this.formData.append('image', event.blob, 'cropped_image.png');
    }

    // event.blob can be used to upload the cropped image
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

    if (this.profile.image) {
      this.profileImageSubscription.unsubscribe()
    }


  }



}
