import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { categoryInterface, filterInterFace, instrctorModel } from 'src/app/shared/interface/common.interface';
import { FilterService } from 'src/app/shared/services/filter.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {
  rating = 0
  range = 0
  categories!: categoryInterface[]
  instructors!: instrctorModel[]
  years: number[] = [];
  year = ''
  instructor = ''
  category = ''
  instructorsSubscription!: Subscription
  categorySubscription!: Subscription

  constructor(
    private filterService: FilterService
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.years.push(i);
    }
  }

  ngOnInit(): void {
    this.instructorsSubscription = this.filterService.getInstructors().subscribe((res) => {
      this.instructors = res
    })

    this.categorySubscription = this.filterService.getCategory().subscribe((res) => {
      console.log(res)
      this.categories = res
    })
  }

  reset() {
    this.rating = 0
    this.range = 0
    this.category = ''
    this.year = ''
    this.instructors = []
  }



  filterCourse() {
    if (this.rating || this.range || this.instructor || this.category || this.year) {
      const filterCredentials: filterInterFace = {
        rating: this.rating,
        range: this.range,
        instructor: this.instructor,
        category: this.category,
        year: +this.year
      }
      //filter call
      this.filterService.filterCourse(filterCredentials)
    }
  }

  ngOnDestroy(): void {
    this.instructorsSubscription.unsubscribe()
  }





}
