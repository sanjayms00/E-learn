import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-instructor-course-create',
  templateUrl: './instructor-course-create.component.html',
  styleUrls: ['./instructor-course-create.component.css']
})
export class InstructorCourseCreateComponent {
  items!: MenuItem[];
  
  gfg: number = 0; 
  
  chan() { 
    this.gfg += 1; 
  } 
  ngOnInit() {
      this.items = [
          {label: 'Course Information'},
          {label: 'Course options'},
          {label: 'Course Content'},
          {label: 'Course preview'}
      ];
  }
}
