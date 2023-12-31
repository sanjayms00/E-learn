import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchedCourses!: Course[];
  thumbnail = constant.thumbnail;
  searchText: string = ''
  result: string = ''

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.courseService.getAllCourse().subscribe(res => {
      this.searchedCourses = res
    })

  }

  searchCourse() {
    if (this.searchText.trim()) {
      this.courseService.searchCourse(this.searchText).subscribe(res => {
        this.result = this.searchText
        this.searchedCourses = res
      })
    } else {
      this.toastr.error("Please enter a search term before proceeding.");
      this.searchText = '';

    }

  }





}
