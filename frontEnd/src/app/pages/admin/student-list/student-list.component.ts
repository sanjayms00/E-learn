import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { statusInterface } from 'src/app/shared/interface/admin.interface';
import { clientInterface } from 'src/app/shared/interface/common.interface';
import { clientStatusChange, getCientList } from 'src/app/shared/store/actions/admin.action';
// import { studentlistSelector } from 'src/app/shared/store/selectors/admin.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [ListingService]
})
export class StudentListComponent implements OnInit, OnDestroy {

  studentList !: clientInterface[];
  studentSubscription !: Subscription;
  searchText = ''

  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getCientList())
    // this.studentSubscription = this.store.select(studentlistSelector)
    //   .subscribe(data => {
    //     console.log(data);
        
    //     this.studentList = []
    //   })
    this.studentList = []
  }

  searchData(event: any) {
    this.searchText = event
  }

  //block / unblock student
  changeStudentStatus(event: statusInterface) {
    this.store.dispatch(clientStatusChange(event))
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe()
  }
}
