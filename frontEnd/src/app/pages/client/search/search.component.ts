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
  filteredCourses: Course[] = []


  constructor(
    private filterService: FilterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.allCourse()
  }

  allCourse() {
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
    } else {
      this.allCourse()
      this.toastr.error("Please enter a search text before proceeding.");
      this.searchText = '';
    }
  }


  filteredEvent(event: Course[]) {
    this.searchedCourses = event
  }


  makeAscName() {
    this.searchedCourses.sort((a, b) => {
      const nameA = a.courseName.toLowerCase();
      const nameB = b.courseName.toLowerCase();
      return nameA.localeCompare(nameB);
    });

  }

  makeDescName() {
    this.searchedCourses.sort((a, b) => {
      const nameA = a.courseName.toLowerCase();
      const nameB = b.courseName.toLowerCase();
      return nameB.localeCompare(nameA);
    });

  }



}
