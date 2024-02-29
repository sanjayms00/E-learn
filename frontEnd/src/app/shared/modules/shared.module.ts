import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GraphComponent } from '../components/graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { VideoPlayerComponent } from '../../pages/client/video-player/video-player.component';
import { DashboardBoxComponent } from '../components/dashboard-box/dashboard-box.component';
import { ChatRightComponent } from '../components/chat-right/chat-right.component';
import { ChatLeftComponent } from '../components/chat-left/chat-left.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { TableComponent } from '../components/table/table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    TruncatePipe,
    TimeAgoPipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent,
    ChatLeftComponent,
    LoginComponent,
    RegisterComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    ChartModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AutoCompleteModule,
  ],
  exports: [
    TruncatePipe,
    TimeAgoPipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent,
    NgxPaginationModule,
    ChatLeftComponent,
    LoginComponent,
    RegisterComponent,
    TableComponent
  ]
})
export class SharedModule { }
