import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { videoInterface } from 'src/app/shared/interface/video.interface';

@Component({
  selector: 'app-stream-video',
  templateUrl: './stream-video.component.html'
})
export class StreamVideoComponent implements OnInit {
  videoData!: videoInterface
  activeIndex: number | undefined = 0;

  activeIndexChange(index: number) {
    this.activeIndex = index
  }

  constructor(
    private route: ActivatedRoute,
    private learningService: LearningService
  ) { }

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('id')
    if (videoId) {
      this.learningService.getCourseVideo(videoId).subscribe((res) => {
        this.videoData = res
        console.log(this.videoData)
      })
    }
  }



}
