import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GraphComponent } from '../components/graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { VideoPlayerComponent } from 'src/app/pages/client/video-player/video-player.component';
import { DashboardBoxComponent } from '../components/dashboard-box/dashboard-box.component';
import { ChatRightComponent } from '../components/chat-right/chat-right.component';

@NgModule({
  declarations: [
    TruncatePipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    TruncatePipe,
    GraphComponent,
    VideoPlayerComponent,
    DashboardBoxComponent,
    ChatRightComponent
  ]
})
export class SharedModule { }
