import { Component, Input } from '@angular/core';
import { Course } from '../../interface/common.interface';
import { constant } from 'src/app/core/constant/constant';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['course-card.component.css']
})
export class CourseCardComponent {

  url: string = environment.cloudFrontUrl

  @Input() course!: Course;


}
