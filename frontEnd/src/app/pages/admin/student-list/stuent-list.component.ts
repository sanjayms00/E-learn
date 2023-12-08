import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { clientInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [ListingService]
})
export class StudentListComponent implements OnInit {

  studentList$ !: Observable<clientInterface[]>

  constructor(
    private listingService : ListingService
  ){}

  ngOnInit(): void {
    this.studentList$ = this.listingService.getStudentList();
  }


}
