import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services/admin/category.service';
import { categoryInterface } from '../../../shared/interface/common.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: string = ''
  p: number = 1;
  allCategories: categoryInterface[] = []
  categorySubscription!: Subscription
  menu = ["no", "Category name", "Status"]

  constructor(
    private caetgoryService: CategoryService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.categorySubscription = this.caetgoryService.getCategories()

      .subscribe({
        next: res => {
          this.allCategories = res
        },
        error: err => {
          console.log(err)
        }
      })
  }

  createCategory() {
    const category = this.category.trim()
    if (category) {
      this.caetgoryService.addCategory({ category: category })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.caetgoryService.getCategories()
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe(res => {
                this.allCategories = res
              })
            this.toastr.success("Category created successfully")
            this.category = ''
          },
          error: err => {
            console.log(err)
          }
        })
    } else {
      this.toastr.error("Field is empty")
      this.category = ''
    }
  }

  delete(id: string, status: boolean) {
    console.log(id, status)  //todo
  }

  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
  }

}
