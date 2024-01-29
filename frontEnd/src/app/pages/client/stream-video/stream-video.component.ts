import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { InstructorData, StreamResponse, VideoData } from 'src/app/shared/interface/video.interface';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html'
})
export class StreamVideoComponent implements OnInit {
  streamData!: StreamResponse
  url: string = environment.cloudFrontUrl;
  activeVideoData!: VideoData[];
  activeVideo: string | null = null;
  chapters: VideoData[] = []
  activeIndex: number | undefined = 0;
  courseId!: string;
  videoId!: string;
  activeChapterData: string = ''
  activeChapterTitle: string = ''
  instructorData!: InstructorData;

  constructor(
    private route: ActivatedRoute,
    private learningService: LearningService
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  activeIndexChange(index: number) {
    this.activeIndex = index;
  }

  getCourse() {
    this.route.queryParams.subscribe((params) => {
      this.courseId = params['course'];
      this.videoId = params['video'];
    });

    if (this.courseId && this.videoId) {
      this.learningService.streamCourse(this.courseId, this.videoId).subscribe((res) => {
        this.streamData = res;
        console.log(this.streamData)
        this.chapters = this.streamData.courseData[0].videoData;
        this.activeVideoData = this.streamData.courseData[0].videoData.filter(
          (item) => item._id == this.videoId
        );
        this.activeVideo = this.activeVideoData[0].file;
        this.activeChapterData = this.activeVideoData[0].description;
        this.activeChapterTitle = this.activeVideoData[0].title;

        this.instructorData = this.streamData.courseData[0].instructorData[0]

      });
    }
  }


  changeActiveVideo(file: string, description: string, title: string) {
    this.activeVideo = file;
    this.activeChapterData = description
    this.activeChapterTitle = title
  }

}
