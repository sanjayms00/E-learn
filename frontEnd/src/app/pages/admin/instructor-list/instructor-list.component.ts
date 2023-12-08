import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { clientInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css'],
  providers: [ListingService]
})
export class InstructorListComponent implements OnInit {

  instructorList$ !: Observable<clientInterface[]>

  constructor(
    private listingService : ListingService
  ){}

  ngOnInit(): void {
    this.instructorList$ = this.listingService.getInstructorList();
  }


}
