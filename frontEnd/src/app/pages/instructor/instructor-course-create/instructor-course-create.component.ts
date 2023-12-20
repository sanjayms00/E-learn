import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-instructor-course-create',
  templateUrl: './instructor-course-create.component.html',
  styleUrls: ['./instructor-course-create.component.css']
})
export class InstructorCourseCreateComponent {
  items !: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Step 1'},
          {label: 'Step 2'},
          {label: 'Step 3'}
      ];
  }
}
