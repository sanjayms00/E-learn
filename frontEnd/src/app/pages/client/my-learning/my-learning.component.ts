import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { myLearning } from 'src/app/shared/interface/myLearning.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html'
})
export class MyLearningComponent implements OnInit {

  myCourse: myLearning[] = []
  visible: boolean = false;
  url = environment.cloudFrontUrl

  constructor(
    private learningService: LearningService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMyCourses()
  }

  //get the purchased courses.
  getMyCourses() {
    this.learningService.getMyCourses().subscribe({
      next: (res) => {
        this.myCourse = res;
      },
      error: (err) => {
        this.toastr.error(err);
      }
    });
  }

  //modal open  
  showDialog() {
    this.visible = true;
  }



}
