import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { InstructorData, StreamResponse, VideoData } from 'src/app/shared/interface/video.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html'
})
export class StreamVideoComponent implements OnInit {
  streamData!: StreamResponse
  activeVideoData!: VideoData[];
  activeVideo: string | null = null;
  activeVideoId: string | null = null;
  chapters: VideoData[] = []
  activeIndex: number | undefined = 0;
  courseId!: string;
  videoId!: string;
  activeChapterData: string = ''
  activeChapterTitle: string = ''
  instructorData: InstructorData = {
    fullName: '',
    email: '',
    mobile: 0
  };
  progress: number = 0
  viewedChapters: string[] = []
  visible: boolean = false;
  courseHeading: string = ''
  courseDescription: string = ''
  courseContent: string = ''

  constructor(
    private route: ActivatedRoute,
    private learningService: LearningService,
    private destroyRef: DestroyRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  activeIndexChange(index: number) {
    this.activeIndex = index;
  }

  showDialog() {
    this.visible = true;
  }

  getCourse() {
    this.route.queryParams.subscribe((params) => {
      this.courseId = params['course'];
      this.videoId = params['video'];
    });

    if (this.courseId && this.videoId) {
      this.learningService.streamCourse(this.courseId, this.videoId)
        .pipe(takeUntilDestroyed(this.destroyRef))   //for unsubscribing the observable
        .subscribe((res) => {
          this.streamData = res;
          this.courseHeading = this.streamData.courseData[0].courseName
          this.courseDescription = this.streamData.courseData[0].description
          this.courseContent = this.streamData.courseData[0].description
          this.chapters = this.streamData.courseData[0].videoData;
          this.viewedChapters = this.streamData.studentData.courses[0].watched;
          //find progress
          this.progress = this.learningService.findProgress(this.chapters.length, this.viewedChapters.length)

          if (this.progress >= 100) this.showDialog()

          this.activeVideoData = this.streamData.courseData[0].videoData.filter(
            (item) => item._id == this.videoId
          );
          this.activeVideo = this.activeVideoData[0].signedUrl;
          this.activeVideoId = this.activeVideoData[0]._id;
          this.activeChapterData = this.activeVideoData[0].description;
          this.activeChapterTitle = this.activeVideoData[0].title;

          this.instructorData = this.streamData.courseData[0].instructorData[0]
        });
    }
  }

  changeActiveVideo(file: string, description: string, title: string, videoId: string) {
    this.activeVideo = file;
    this.activeVideoId = videoId;
    this.activeChapterData = description
    this.activeChapterTitle = title
  }

  updateChapterInfo(event: string) {
    this.learningService.updateChapterViewed(event, this.courseId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.viewedChapters = res.courses[0].watched;
          this.progress = this.learningService.findProgress(this.chapters.length, this.viewedChapters.length)
          if (this.progress >= 100) this.showDialog()
        },
        error: err => {
          this.toastr.error(err)
        }
      })
  }


}
