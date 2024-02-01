import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { GraphComponent } from '../components/graph/graph.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    TruncatePipe,
    GraphComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [TruncatePipe, GraphComponent]
})
export class SharedModule { }
