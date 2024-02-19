import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ListingService } from '../../../core/services/admin/listing.service';
import { studentInterface } from '../../../shared/interface/common.interface';
import { getStudentList, studentStatusChange } from '../../../shared/store/actions/admin.action';
import { studentlistSelector } from '../../../shared/store/selectors/admin.selector';
import { appState } from '../../../shared/store/state/app.state';



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html', providers: [ListingService]
})
export class StudentListComponent implements OnInit {

  studentList !: studentInterface[];
  menu = ['no', "Name", "Email", "Mobile", "Status", "Action"]

  constructor(
    private store: Store<appState>,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getStudentList())
    this.store.select(studentlistSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.studentList = data
      })
  }

  //block / unblock student
  changeStudentStatus(event: { id: string, status: boolean }) {
    this.store.dispatch(studentStatusChange({ id: event.id, status: event.status }))
  }

}
