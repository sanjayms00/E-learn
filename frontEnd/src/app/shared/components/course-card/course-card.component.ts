import { Component, Input } from '@angular/core';
import { Course } from '../../interface/common.interface';
import { constant } from 'src/app/core/constant/constant';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {

  thumbnail = constant.thumbnail
  @Input() course!: Course;



}
