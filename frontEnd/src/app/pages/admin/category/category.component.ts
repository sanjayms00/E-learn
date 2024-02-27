import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../core/services/admin/category.service';
import { categoryInterface } from '../../../shared/interface/common.interface';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  providers: [ConfirmationService]
})
export class CategoryComponent implements OnInit, OnDestroy {

  category: string = ''
  p: number = 1;
  allCategories: categoryInterface[] = []
  categorySubscription!: Subscription
  menu = ["no", "Category name", "Action"]

  constructor(
    private caetgoryService: CategoryService,
    private toastr: ToastrService,
    private destroyRef: DestroyRef,
    private confirmationService: ConfirmationService,
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
           this.allCategories = res
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

  delete(categoryId: string) {
    this.caetgoryService.removeCategory(categoryId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.allCategories = res
          this.toastr.success("Record deleted")
        },
        error: err => {
          this.toastr.error(err.message)
        }
      })
  }

  //popup delete confirmation
  confirm(event: Event, categoryId: string,) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.delete(categoryId)
      },
      reject: () => {
        this.toastr.error("You have rejected")
      }
    });
  }


  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe()
  }

}
