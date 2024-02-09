import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { studentInterface } from 'src/app/shared/interface/common.interface';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit, OnDestroy {

  profile !: studentInterface
  profileSubscription !: Subscription
  visible = false

  constructor(
    private store: Store<appState>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.profileSubscription = this.store.select(getclient)
      .subscribe({
        next: res => {
          this.profile = res
        },
        error: err => {
          this.toastr.error(err.message)
        }
      })
  }

  showDialog() {
    this.visible = true;
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe()
  }

}
