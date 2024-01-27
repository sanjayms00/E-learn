import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { StreamResponse } from 'src/app/shared/interface/video.interface';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html'
})
export class StreamVideoComponent implements OnInit {
  streamData: StreamResponse = {
    courseData: [],
  };
  url: string = environment.cloudFrontUrl;
  activeVideoData!: any;
  activeVideo: string | null = null;
  chapters!: any;
  activeIndex: number | undefined = 0;
  courseId!: string;
  videoId!: string;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  dataLoaded = false;
  videoStarted = false;

  constructor(private route: ActivatedRoute, private learningService: LearningService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  ngAfterViewInit() {
    this.videoPlayer.nativeElement.onloadeddata = () => {
      console.log('Video data is loaded.');
      this.dataLoaded = true;
    };

    this.videoPlayer.nativeElement.onplaying = () => {
      console.log('Video is no longer paused.');
      this.videoStarted = true;
    };
  }

  activeIndexChange(index: number) {
    this.activeIndex = index;
  }

  getCourse() {
    this.route.queryParams.subscribe((params) => {
      this.courseId = params['courseId'];
      this.videoId = params['videoId'];
    });

    if (this.courseId && this.videoId) {
      this.learningService.streamCourse(this.courseId, this.videoId).subscribe((res) => {
        this.streamData = res;
        this.chapters = this.streamData.courseData[0].videoData;
        this.activeVideoData = this.streamData.courseData[0].videoData.filter(
          (item) => item._id == this.videoId
        );
        this.activeVideo = this.activeVideoData[0].file;
      });
    }
  }

  // Change the video when a chapter is clicked
  changeActiveVideo(file: string) {
    this.activeVideo = file;
  }


}
