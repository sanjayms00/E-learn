import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: string = ''

  allCategories : categoryInterface[] = []


  constructor(
    private caetgoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.caetgoryService.getCategories().subscribe(res=>{
      this.allCategories = res
    })
  }
  
  createCategory(){
    this.caetgoryService.addCategory({category: this.category}).subscribe(
      res=>{
        alert(res)
      },
      err=>{
        alert(err.message)
      }
      )
  }


}
