import { Component, Input } from '@angular/core';
import { Course } from '../../interface/common.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html'
})
export class CourseCardComponent {

  @Input()
  course: Course = {
    _id: '',
    courseName: '',
    description: '',
    categoryId: '',
    price: 0,
    students: [],
    signedUrl: '',
    thumbnail: '',
    trailer: '',
    courseTags: '',
    content: '',
    courseLevel: [],
    createdAt: new Date,
    updatedAt: new Date,
    instructorName: '',
    categoryName: '',
    ratingreview: [],
    videoData: [{ title: '', description: '' }]
  }

}
