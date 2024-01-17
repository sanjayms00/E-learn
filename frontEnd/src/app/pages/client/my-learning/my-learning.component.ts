import { Component, OnInit } from '@angular/core';
import { LearningService } from 'src/app/core/services/client/learning.service';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html'
})
export class MyLearningComponent implements OnInit {

  myCourse: any = []


  constructor(
    private learningService: LearningService
  ) { }

  ngOnInit(): void {
    this.learningService.getMyCourses().subscribe((res) => {
      this.myCourse = res
    })
  }




}
