import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services/admin/category.service';
import { categoryInterface } from '../../../shared/interface/common.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  category: string = ''
  p: number = 1;
  allCategories: categoryInterface[] = []
  menu = ["no", "Category name", "Status", "Action"]

  constructor(
    private caetgoryService: CategoryService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.caetgoryService.getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
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
            this.toastr.success(res.toString())
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



}
