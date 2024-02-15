import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  category: string = ''
  p: number = 1;
  allCategories: categoryInterface[] = []


  constructor(
    private caetgoryService: CategoryService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.caetgoryService.getCategories().subscribe(res => {
      this.allCategories = res
    })
  }

  createCategory() {
    this.caetgoryService.addCategory({ category: this.category }).subscribe({
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
        this.toastr.error(err.message)
      }
    })
  }


}
