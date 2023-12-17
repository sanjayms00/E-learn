import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { statusInterface } from 'src/app/shared/interface/admin.interface';
import { clientInterface } from 'src/app/shared/interface/common.interface';
import { clientStatusChange, getCientList } from 'src/app/shared/store/actions/admin.action';
import { instructorlistSelector } from 'src/app/shared/store/selectors/admin.selector';
import { appState } from 'src/app/shared/store/state/app.state';

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
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getCientList())
    this.instructorSubscription = this.store.select(instructorlistSelector)
      .subscribe(data => {
        this.instructorList = data
      })
  }

  searchData(event: string) {
    this.searchText = event
  }

  changeStudentStatus(event: statusInterface) {
    this.store.dispatch(clientStatusChange(event))
  }

  ngOnDestroy(): void {
    this.instructorSubscription.unsubscribe()
  }
}
