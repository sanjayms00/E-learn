// video-player.component.ts

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html'
})
export class VideoPlayerComponent implements OnChanges {
  currentTime: number = 0;
  videoDuration: number = Number.POSITIVE_INFINITY;
  hostUrl: string = environment.cloudFrontUrl;

  @Input() videoUrl: string | null = null;
  @Input() videoId: string | null = null;
  @Output() videoStatus = new EventEmitter()
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoUrl'] && !changes['videoUrl'].firstChange) {
      this.updateVideo();
    }
  }

  updateVideoProgress() {
    this.currentTime = this.videoPlayer.nativeElement.currentTime;
    if (this.currentTime >= this.videoDuration) {
      //emit data to parent
      this.videoStatus.emit(this.videoId)
    }
  }


  private updateVideo(): void {

    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      this.videoDuration = this.videoPlayer.nativeElement.duration;
    });

    const videoElement: HTMLVideoElement = this.videoPlayer.nativeElement

    if (videoElement) {
      // Pause the video
      videoElement.pause();

      // Remove src attribute and reload the video
      videoElement.removeAttribute('src');

      // reload the video element
      videoElement.load();

      // Set the new video source
      if (this.videoUrl) {
        videoElement.src = this.hostUrl + this.videoUrl;
      }
    }
  }


}
