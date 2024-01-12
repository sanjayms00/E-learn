import { Component } from '@angular/core';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html',
  styleUrls: ['./stream-video.component.css']
})
export class StreamVideoComponent {
  activeIndex: number | undefined = 0;

  activeIndexChange(index: number) {
    this.activeIndex = index
  }
}
