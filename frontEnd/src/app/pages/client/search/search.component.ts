import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/CourseService';
import { Course } from 'src/app/shared/interface/common.interface';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  searchedCourses: Course[] = [];
  p: number = 1;
  searchText: string = ''
  result: string = ''
  filteredCourses: Course[] = []
  cities: any[] | undefined;
  selectedCity: any | undefined;

  constructor(
    private filterService: FilterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.allCourse()
    this.cities = [
      { name: ' Course A→Z', code: 'courseAsc' },
      { name: ' Course Z→A', code: 'courseDesc' },
      { name: ' price low - high', code: 'priceAsc' },
      { name: ' price high - low', code: 'priceDesc' },
    ];
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

  onDropdownChange(event: any) {
    if (event.value.code == 'courseAsc') {
      this.makeAscName()
    }
    else if (event.value.code == 'courseDesc') {
      this.makeDescName()
    }
    else if (event.value.code == 'priceAsc') {
      this.makeAscPrice()
    }
    else if (event.value.code == 'priceDesc') {
      this.makeDescPrice()
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

  makeAscPrice() {
    this.searchedCourses.sort((a, b) => a.price - b.price);
  }
  makeDescPrice() {
    this.searchedCourses.sort((a, b) => b.price - a.price);
  }


  courseTrackBy(index: number, course: Course) {
    return course._id;
  }


}
