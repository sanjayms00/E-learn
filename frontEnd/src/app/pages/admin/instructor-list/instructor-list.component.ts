import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { statusInterface } from 'src/app/shared/interface/admin.interface';
import { instructorInterface } from 'src/app/shared/interface/common.interface';
import { clientStatusChange, getInstructorList } from 'src/app/shared/store/actions/admin.action';
import { instructorlistSelector } from 'src/app/shared/store/selectors/admin.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  providers: [ListingService]
})
export class InstructorListComponent implements OnInit {

  instructorList: instructorInterface[] = []
  // instructorSubscription !: Subscription


  
  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getInstructorList())
    this.store.select(instructorlistSelector)
      .subscribe(data => {
        this.instructorList = data
      })
  }

  searchData(event: string) {
    console.log(event);
  }

  changeStudentStatus(event: statusInterface) {
    this.store.dispatch(clientStatusChange(event))
  }

}
