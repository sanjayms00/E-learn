import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessageResponse, message } from 'src/app/shared/interface/chat.interface';
import { ChatService } from 'src/app/shared/services/chat.service';
import { getinstructorDataFromLocal } from 'src/app/shared/store/actions/instructor.action';
import { getInstructor } from 'src/app/shared/store/selectors/instructor.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
    selector: 'app-instructor',
    templateUrl: './instructor.component.html'
})
export class InstructorComponent implements OnInit, DoCheck {
    items!: MenuItem[];
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;
    sidebarVisible: boolean = true;
    instructorNotification: MessageResponse[] = []
    instructorId: string  = ''


    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private store: Store<appState>,
        private chatservice: ChatService
    ) { }

    ngOnInit() {
        this.setInstructorData()
        this.store.select(getInstructor).subscribe(res => {
            this.instructorId = res._id
        })
    }

    ngDoCheck(): void {

        this.instructorNotification = this.chatservice.instructorNotification.filter(noti => {
            return noti.chatRoomData.instructor == this.instructorId
        })
        
        this.chatservice.getInstructorNotifications(this.instructorId)

    }


    //instructor logout
    logout() {
        this.authService.instructorLogout()
        this.toastr.success("Logout successful")
        this.router.navigateByUrl("/instructor/login")
    }

    closeCallback(e: any): void {
        this.sidebarRef.close(e);
    }

    setInstructorData() {
        const instructorData = this.authService.getLocalInstructorData()

        if (!instructorData) {
            this.authService.instructorLogout()
            return;
        }

        this.store.dispatch(getinstructorDataFromLocal({ user: JSON.parse(instructorData) }))
    }



}
