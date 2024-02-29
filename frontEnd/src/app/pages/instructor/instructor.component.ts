import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from '../../core/services/auth.service';
import { MessageDetailedResponse, MessageResponse } from '../../shared/interface/chat.interface';
import { ChatService } from '../../shared/services/chat.service';
import { getinstructorDataFromLocal } from '../../shared/store/actions/instructor.action';
import { getInstructor } from '../../shared/store/selectors/instructor.selector';
import { appState } from '../../shared/store/state/app.state';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-instructor',
    templateUrl: './instructor.component.html'
})
export class InstructorComponent implements OnInit, DoCheck {

    items!: MenuItem[];
    instructorId: string = ''
    notifications: MessageDetailedResponse[] = []
    sidebarVisible: boolean = true;
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;


    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private store: Store<appState>,
        private chatService: ChatService
    ) { }

    ngOnInit() {
        initFlowbite();
        this.setInstructorData()
        this.store.select(getInstructor).subscribe(res => {
            this.instructorId = res._id
            this.chatService.connect(this.instructorId)
        })
    }


    ngDoCheck(): void {
        this.notifications = this.chatService.notification
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
