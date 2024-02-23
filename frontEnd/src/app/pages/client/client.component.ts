import { Component, DestroyRef, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { constant } from '../../core/constant/constant';
import { AuthService } from '../../core/services/auth.service';
import { MessageResponse } from '../../shared/interface/chat.interface';
import { ChatService } from '../../shared/services/chat.service';
import { ProfileService } from '../../shared/services/profile.service';
import { getClientDataFromLocal } from '../../shared/store/actions/client.action';
import { getclient } from '../../shared/store/selectors/client.selector';
import { appState } from '../../shared/store/state/app.state';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { initCollapses, initFlowbite } from 'flowbite';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, DoCheck {
  logSign = false;
  courseSearch: string = ''
  menu = ['home', 'instructor', 'chat', 'learning']
  notifications: MessageResponse[] = []
  studentId: string = ''
  profile: string = constant.noProfile
  name!: string
  profileSubscription!: Subscription


  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router,
    private store: Store<appState>,
    private toastr: ToastrService,
    private destroyRef: DestroyRef,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    initFlowbite();
    initCollapses();
    //initialize the socket
    const clientData = this.authService.getLocalClientData()
    if (clientData) {
      this.store.dispatch(getClientDataFromLocal({ user: JSON.parse(clientData) }))
    }

    this.store.select(getclient)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.studentId = res._id

        this.chatService.connect(this.studentId)

        if (res.image) {
          this.getProfileImage(res.image)
          this.name = res.fullName
        }
      })

  }

  getProfileImage(image: string) {
    this.profileService.studentprofileImage(image)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.profile = res.profileImage
      })
  }

  searchCourse() {
    this.router.navigate(['/search'])
  }

  ngDoCheck(): void {
    if (this.chatService.notification.length > 0) {
      this.notifications = this.chatService.notification.filter(notification => {
        return notification.message && notification.message.receiver == this.studentId;
      })
    }


    if (this.authService.getClientToken()) {
      this.logSign = false
    } else {
      this.logSign = true
    }
  }

  logout() {
    const clientToken = this.authService.getClientToken()
    if (clientToken) {
      this.authService.clientLogout()
      this.router.navigate(["/login"])
      this.toastr.success('logout successfull')
    }
  }

}
