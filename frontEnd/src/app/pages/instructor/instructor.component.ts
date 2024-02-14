import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from 'src/app/core/services/auth.service';
import { getinstructorDataFromLocal } from 'src/app/shared/store/actions/instructor.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
    selector: 'app-instructor',
    templateUrl: './instructor.component.html'
})
export class InstructorComponent {
    items!: MenuItem[];
    @ViewChild('sidebarRef') sidebarRef!: Sidebar;
    sidebarVisible: boolean = true;


    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private store: Store<appState>
    ) { }


    ngOnInit() {

        this.setInstructorData()


        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-sitemap',
                routerLink: '/instructor/dashboard'
            },
            {
                label: 'Courses',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    {
                        label: 'All Courses',
                        icon: 'pi pi-book',
                        routerLink: '/instructor/courses'
                    },
                    {
                        label: 'Create Course',
                        icon: 'pi pi-video',
                        routerLink: '/instructor/create'
                    }
                ]
            },
            {
                label: 'Chat',
                icon: 'pi pi-send',
                routerLink: '/instructor/chat'
            },
            // {
            //     label: 'Notifications',
            //     icon: 'pi pi-fw pi-calendar',
            //     items: [
            //         {
            //             label: 'Edit',
            //             icon: 'pi pi-fw pi-pencil',
            //             items: [
            //                 {
            //                     label: 'Save',
            //                     icon: 'pi pi-fw pi-calendar-plus'
            //                 },
            //                 {
            //                     label: 'Delete',
            //                     icon: 'pi pi-fw pi-calendar-minus'
            //                 },

            //             ]
            //         },
            //         {
            //             label: 'Archieve',
            //             icon: 'pi pi-fw pi-calendar-times',
            //             items: [
            //                 {
            //                     label: 'Remove',
            //                     icon: 'pi pi-fw pi-calendar-minus'
            //                 }
            //             ]
            //         }
            //     ]
            // }
        ];
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
