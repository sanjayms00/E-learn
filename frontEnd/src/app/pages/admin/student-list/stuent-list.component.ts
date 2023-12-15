import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { clientInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [ListingService]
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList !: clientInterface[];
  studentSubscription !: Subscription;
  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.studentSubscription = this.listingService.getStudentList().subscribe((data) => {
      this.studentList = data
    })
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe()
  }



}
