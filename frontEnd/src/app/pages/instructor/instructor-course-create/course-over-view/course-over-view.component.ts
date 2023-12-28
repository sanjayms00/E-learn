import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-course-over-view',
  templateUrl: './course-over-view.component.html',
  styleUrls: ['./course-over-view.component.css']
})
export class CourseOverViewComponent implements OnInit {
  // ticketInformation: any;
    
  constructor(public ticketService: TicketService, private router: Router) { }

  ngOnInit() { 
      //this.ticketInformation = this.ticketService.ticketInformation;
  }

  complete() {
      //this.ticketService.complete();
  }

  prevPage() {
    this.router.navigate(['instructor/create/content']);
  }
}
