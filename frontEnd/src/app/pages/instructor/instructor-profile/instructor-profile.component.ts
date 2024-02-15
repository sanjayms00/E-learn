
import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  formData = new FormData()


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
    });
  }

  profileUpdate() {
    if (this.profileForm.valid) {


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

            console.log(res)
            this.profile = res
            localStorage.setItem('instructorData', JSON.stringify(res))
            this.toastr.success("profile updated")
            this.formData = new FormData()
          },
          error: err => {
            this.toastr.error(err.message)
            this.formData = new FormData()
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
  }



}
