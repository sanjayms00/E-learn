import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GraphComponent } from '../components/graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { VideoPlayerComponent } from 'src/app/pages/client/video-player/video-player.component';
import { DashboardBoxComponent } from '../components/dashboard-box/dashboard-box.component';
import { ChatRightComponent } from '../components/chat-right/chat-right.component';
import { ChatLeftComponent } from '../components/chat-left/chat-left.component';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    TruncatePipe,
    TimeAgoPipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent,
    ChatLeftComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    FormsModule,
    PickerModule
  ],
  exports: [
    TruncatePipe,
    TimeAgoPipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent,
    ChatLeftComponent
  ]
})
export class SharedModule { }
