import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { ProfileService } from 'src/app/core/services/client/profile.service';
import { studentInterface } from 'src/app/shared/interface/common.interface';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit, OnDestroy {

  profileData !: studentInterface
  profileSubscription !: Subscription

  constructor(
    private store: Store<appState>
  ) { }

  ngOnInit(): void {
    this.profileSubscription = this.store.select(getclient).subscribe((res) => {
      this.profileData = res
    })
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
  }

}
