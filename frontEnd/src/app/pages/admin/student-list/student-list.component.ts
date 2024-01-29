import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { Observable } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { studentInterface } from 'src/app/shared/interface/common.interface';
import { getStudentList, studentStatusChange } from 'src/app/shared/store/actions/admin.action';
import { studentlistSelector } from 'src/app/shared/store/selectors/admin.selector';
import { appState } from 'src/app/shared/store/state/app.state';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html', providers: [ListingService]
})
export class StudentListComponent implements OnInit {

  studentList !: studentInterface[];
  searchText = ''


  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getStudentList())
    this.store.select(studentlistSelector)
      .subscribe(data => {
        this.studentList = data
      })
  }

  searchData(event: string) {
    this.searchText = event
  }

  //block / unblock student
  changeStudentStatus(id: string, status: boolean) {
    console.log(id)
    this.store.dispatch(studentStatusChange({ id, status }))
  }

}
