import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/shared/interface/common.interface';
import { instructorLogin } from 'src/app/shared/store/actions/instructor.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html'
})
export class InstructorLoginComponent {

  title = "Instructor";
  description = "Unlocking Knowledge, One Login at a Time."

  constructor(
    private store: Store<appState>
  ) { }

  loginData(event: IUser) {
    this.store.dispatch(instructorLogin({ loginData: event }))
  }

}
