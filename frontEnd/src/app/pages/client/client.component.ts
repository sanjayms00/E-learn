import { Component, DestroyRef, DoCheck, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageResponse, message } from 'src/app/shared/interface/chat.interface';
import { categories } from 'src/app/shared/interface/common.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { getClientDataFromLocal } from 'src/app/shared/store/actions/client.action';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit, DoCheck {
  togg = true
  icon = "/assets/logo/grid.svg"
  logSign = false;
  courseSearch: string = ''
  showMenu = false;
  categories: categories[] = []
  profileArr = ['profile', 'learning', 'chat']
  notifications: MessageResponse[] = []
  studentId: string = ''
  profile: string = constant.noProfile

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private router: Router,
    private store: Store<appState>,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
    const clientData = this.authService.getLocalClientData()
    if (clientData) {
      this.store.dispatch(getClientDataFromLocal({ user: JSON.parse(clientData) }))
    }

    this.store.select(getclient).subscribe(res => {
      this.studentId = res._id
      if (res.image) {
        this.getProfileImage(res.image)
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

  getCategoryData() {
    this.categoryService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.categories = res
        console.log(this.categories)
      })
  }

  searchCourse() {
    this.router.navigate(['/search'])
  }


  ngDoCheck(): void {
    this.notifications = this.chatService.notification.filter(noti => {
      return noti.chatRoomData.student == this.studentId
    })

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
