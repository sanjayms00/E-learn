import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-instructor',
    templateUrl: './instructor.component.html',
    styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {
    items!: MenuItem[];

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }


    ngOnInit() {
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
                        routerLink: '/instructor/create/information'
                    }
                ]
            },
            {
                label: 'Students List',
                icon: 'pi pi-fw pi-users',
            },
            {
                label: 'Notifications',
                icon: 'pi pi-fw pi-calendar',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            {
                                label: 'Save',
                                icon: 'pi pi-fw pi-calendar-plus'
                            },
                            {
                                label: 'Delete',
                                icon: 'pi pi-fw pi-calendar-minus'
                            },

                        ]
                    },
                    {
                        label: 'Archieve',
                        icon: 'pi pi-fw pi-calendar-times',
                        items: [
                            {
                                label: 'Remove',
                                icon: 'pi pi-fw pi-calendar-minus'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-power-off',
                command: () => this.logout(),
            }
        ];
    }

    logout() {
        this.authService.instructorLogout()
        this.toastr.success("Logout successful")
        this.router.navigateByUrl("/instructor/login")
    }



}
