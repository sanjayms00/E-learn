import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-instructor-course-create',
  templateUrl: './instructor-course-create.component.html',
  styleUrls: ['./instructor-course-create.component.css'],
  providers: [MessageService]
})
export class InstructorCourseCreateComponent implements OnInit {
  items: MenuItem[] | undefined;

  subscription !: Subscription;

  activeIndex: number = 0;

  constructor(public messageService: MessageService, public ticketService: TicketService) {}


  onActiveIndexChange(event: number) {
      this.activeIndex = event;
  }
  // ngOnInit() {
  //     this.items = [
  //         {
  //           label: 'Course Information',
  //           routerLink: 'instructor/create/information implements OnInit'
  //         },
  //         {
  //           label: 'Course options',
  //           routerLink: 'instructor/create/options'
  //         },
  //         {
  //           label: 'Course Content',
  //           routerLink: 'instructor/create/content'
  //         },
  //         {
  //           label: 'Course preview',
  //           routerLink: 'instructor/create/preview'
  //         }
  //     ];
  // }
  ngOnInit() {
    this.items = [
        {
            label: 'Information',
            command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
        },
        {
            label: 'Options',
            command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
        },
        {
            label: 'Content',
            command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
        },
        {
            label: 'Overview',
            command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
        }
    ];
    this.subscription = this.ticketService.paymentComplete().subscribe((personalInformation) => {
      this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
  });
  }

  
  ngOnDestroy() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
}

}
