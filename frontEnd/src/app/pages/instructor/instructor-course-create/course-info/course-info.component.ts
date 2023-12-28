import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  information = {
    CourseName : '',
    CourseDesc: '',
    CoursePrice: '',
    EstimatedPrice : '',
    CourseTags: '',
    CourseCategory: '',
    CourseLevel: '',
    VideouUrl: '',
    VideoThumbnail : ''
  };

  submitted: boolean = false;

  constructor(public ticketService: TicketService, private router: Router) { }

  ngOnInit() { 
      // this.personalInformation = this.ticketService.getTicketInformation().personalInformation;
  }

  nextPage() {
    console.log(this.information)
      // if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
      //     this.ticketService.ticketInformation.personalInformation = this.personalInformation;
          this.router.navigate(['instructor/create/options']);

      //     return;
      // }

      this.submitted = true;
  }
}
