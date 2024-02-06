import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GraphComponent } from '../components/graph/graph.component';
import { ChartModule } from 'primeng/chart';
import { VideoPlayerComponent } from 'src/app/pages/client/video-player/video-player.component';

@NgModule({
  declarations: [
    TruncatePipe,
    GraphComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [TruncatePipe, GraphComponent, VideoPlayerComponent]
})
export class SharedModule { }
