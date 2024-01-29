// video-player.component.ts

import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
// import { VgApiService } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() videoUrl: string | null = null;
  // @ViewChild('media') media: any;

  constructor(
    // private vgApi: VgApiService
  ) { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoUrl'] && !changes['videoUrl'].firstChange) {
      this.updateVideo();
    }
  }

  // ngAfterViewInit() {
  //   this.vgApi.getDefaultMedia().subscriptions.loadedMetadata.subscribe(() => {
  //     console.log('Metadata loaded');
  //   });
  // }


  private updateVideo(): void {
    const videoElement: HTMLVideoElement | null = document.querySelector('#videoPlayer');

    if (videoElement) {
      // Pause the video
      videoElement.pause();

      // Remove src attribute and reload the video
      videoElement.removeAttribute('src');

      // reload the video element
      videoElement.load();

      // Set the new video source
      if (this.videoUrl) {
        videoElement.src = this.videoUrl;
      }
    }
  }


}
