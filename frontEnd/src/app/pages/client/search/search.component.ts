import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  searchedCourses: Course[] = [];
  thumbnail = constant.thumbnail;
  searchText: string = ''
  result: string = ''

  filteredCourses: any


  constructor(
    private filterService: FilterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.filterService.getAllCourse().subscribe(res => {
      this.searchedCourses = res
    })
    this.filteredCourses = this.filterService.course

  }

  searchCourse() {
    if (this.searchText.trim()) {
      this.filterService.searchCourse(this.searchText).subscribe(res => {
        this.result = this.searchText
        this.searchedCourses = res
      })
      this.filteredCourses = this.filterService.course

    }
    else {
      this.toastr.error("Please enter a search term before proceeding.");
      this.searchText = '';

    }

  }





}
