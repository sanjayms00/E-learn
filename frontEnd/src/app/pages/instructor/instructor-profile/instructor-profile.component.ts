import { Component, OnInit } from '@angular/core';
import { InstructorProfileService } from 'src/app/core/services/instructor/instructor-profile.service';

export type instructorProfileType = {
  fullName : string,
  email : string,
  mobile: string
}


@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html'
})
export class InstructorProfileComponent implements OnInit {

  profile: instructorProfileType= {
    fullName: '',
    email: '',
    mobile: ''
  }

  constructor(
    private profileService: InstructorProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.InstructorProfileData().subscribe(res => {
      this.profile = res
    })
  }

}
