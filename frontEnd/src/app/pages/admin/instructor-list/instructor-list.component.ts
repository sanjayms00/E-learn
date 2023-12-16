import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { clientInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  providers: [ListingService]
})
export class InstructorListComponent implements OnInit, OnDestroy {

  instructorList: clientInterface[] = []
  instructorSubscription !: Subscription
  searchText = ''

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.instructorSubscription = this.listingService.getInstructorList().subscribe((data) => {
      this.instructorList = data
    })
  }

  searchData(event: string) {
    this.searchText = event
  }

  ngOnDestroy(): void {
    this.instructorSubscription.unsubscribe()
  }


}
