import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
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
  instructor = ''
  category = ''
  instructorsSubscription!: Subscription
  categorySubscription!: Subscription
  filterClicked = false
  selectedLevel = '';
  levels = ['beginner', 'intermediate', 'professional'];

  @Output() fillteredCourse = new EventEmitter()


  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.instructorsSubscription = this.filterService.getInstructors().subscribe((res) => {
      this.instructors = res
    })

    this.categorySubscription = this.filterService.getCategory().subscribe((res) => {
      this.categories = res
    })
  }

  reset() {
    this.selectedLevel = ''
    this.instructor = ''
    this.category = ''
  }

  filterCourse() {
    if (this.selectedLevel || this.instructor || this.category) {
      const filterCredentials: filterInterFace = {
        level: this.selectedLevel,
        instructor: this.instructor,
        category: this.category
      }
      //filter call
      this.filterService.filterCourse(filterCredentials).subscribe((res) => {
        this.fillteredCourse.emit(res)
      })
    }
  }

  ngOnDestroy(): void {
    this.instructorsSubscription.unsubscribe()
  }





}
