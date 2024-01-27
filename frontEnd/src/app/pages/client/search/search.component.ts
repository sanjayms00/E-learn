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
    this.filteredCourses = this.searchedCourses

  }

  SearchData(event: string) {
    if (event.trim()) {
      this.filterService.searchCourse(event).subscribe(res => {
        this.result = event
        this.searchedCourses = res
      })
    }
    else {
      this.searchedCourses = this.filteredCourses
      this.toastr.error("Please enter a search term before proceeding.");
      this.searchText = '';

    }
  }


  filteredEvent(event: Course[]) {
    this.searchedCourses = event
    console.log(event)
  }



  makeAscName() {
    this.searchedCourses.sort((a, b) => {
      const nameA = a.courseName.toLowerCase();
      const nameB = b.courseName.toLowerCase();
      return nameA.localeCompare(nameB);
    });
    console.log(this.searchedCourses)
  }

  makeDescName() {
    this.searchedCourses.sort((a, b) => {
      const nameA = a.courseName.toLowerCase();
      const nameB = b.courseName.toLowerCase();
      return nameB.localeCompare(nameA);
    });
    console.log(this.searchedCourses)
  }



}
