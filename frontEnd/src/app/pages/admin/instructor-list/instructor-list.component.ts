import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { ListingService } from '../../../core/services/admin/listing.service';
import { instructorInterface } from '../../../shared/interface/common.interface';
import { getInstructorList, instructorStatusChange } from '../../../shared/store/actions/admin.action';
import { instructorlistSelector } from '../../../shared/store/selectors/admin.selector';
import { appState } from '../../../shared/store/state/app.state';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  providers: [ListingService]
})
export class InstructorListComponent implements OnInit {

  instructorList: instructorInterface[] = []
  p: number = 1;

  constructor(
    private store: Store<appState>,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getInstructorList())
    this.store.select(instructorlistSelector)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.instructorList = data
      })
  }

  changeInstructorStatus(id: string, status: boolean) {
    this.store.dispatch(instructorStatusChange({ id, status }))
  }

}
