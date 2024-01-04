import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
  rating = 0
  range = 0
  instructor = ''
  year = undefined

  constructor(
    private filterService: FilterService
  ){}

  ngOnInit(): void {
    this.filterService.getInstructors().subscribe((res)=>{
      console.log(res)
    })
  }


  filterCourse() {

    console.log({
      rating: this.rating,
      range: this.range,
      year: this.year,
      instructor: this.instructor
    })
  }


  reset() {
    this.rating = 0
    this.range = 0
    this.instructor = ''
    this.year = undefined
  }



}
