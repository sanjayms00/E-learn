import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css']
})
export class CourseContentComponent implements OnInit {
//   paymentInformation: any;

    constructor(public ticketService: TicketService, private router: Router) { }

    ngOnInit() { 
        // this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
    }

    nextPage() {
        this.router.navigate(['instructor/create/overview']);
        // if (this.paymentInformation.cardholderName && this.paymentInformation.cardholderNumber && this.paymentInformation.date && this.paymentInformation.cvv) {
        //     this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
        //     this.router.navigate(['instructor/create/preview']);
        // }
    }

    prevPage() {
        this.router.navigate(['instructor/create/options']);
    }
}
