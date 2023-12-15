import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/client/profile.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  profileData = []

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.profileService.getProfileData().subscribe((data) => {
      console.log(data)
    })
  }



}
