import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

  category: string = ''

  allCategories: categoryInterface[] = []


  constructor(
    private caetgoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.caetgoryService.getCategories().subscribe(res => {
      this.allCategories = res
    })
  }

  createCategory() {
    this.caetgoryService.addCategory({ category: this.category }).subscribe(
      res => {
        this.caetgoryService.getCategories().subscribe(res => {
          this.allCategories = res
        })
        this.toastr.success(res.toString())
        this.category = ''
      },
      err => {
        this.toastr.error(err.message)
      }
    )
  }


}
