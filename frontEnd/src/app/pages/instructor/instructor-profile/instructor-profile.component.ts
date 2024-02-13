
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { instructorInterface } from 'src/app/shared/interface/common.interface';
import { appState } from 'src/app/shared/store/state/app.state';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getInstructor } from 'src/app/shared/store/selectors/instructor.selector';


@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html'
})
export class InstructorProfileComponent implements OnInit {

  profile !: instructorInterface
  profileSubscription !: Subscription
  visible = false
  profileForm!: FormGroup
  imageChangedEvent: any = '';
  croppedImage: any = '';


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
      image: [null, [Validators.required]]
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
          this.toastr.error(err.message)
        }
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
      image: this.profile.image,
    });
  }

  profileUpdate() {
    if (this.profileForm.valid) {
      // const formData = new FormData()

      // Object.keys(this.profileForm.controls).forEach(key => {
      //   const control = this.profileForm.get(key)

      //   if (control instanceof FormControl) {
      //     formData.append(key, control.value)
      //   }
      // })

      // console.log(formData)

      const profileData = this.profileForm.value

      this.profileService.updateInstructorProfile(profileData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.profile = res
            localStorage.setItem('clientData', JSON.stringify(res))
            this.toastr.success("profile updated")
          },
          error: err => {
            this.toastr.error(err.message)
          }
        })
      this.visible = false;

    } else {
      this.toastr.error('fill all the fields')
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);

    this.profileForm.patchValue({
      image: this.croppedImage
    });

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
  }



}
