import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { ProfileService } from 'src/app/core/services/client/profile.service';
import { studentInterface } from 'src/app/shared/interface/common.interface';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent {

}
