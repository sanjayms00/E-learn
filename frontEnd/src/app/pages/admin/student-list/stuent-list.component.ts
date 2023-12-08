import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { studentListService } from 'src/app/core/services/admin/studentList.service';

import { clientInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  providers: [studentListService]
})
export class StudentListComponent implements OnInit {

  studentList$ !: Observable<clientInterface[]>

  constructor(
    private studentService : studentListService
  ){}

  ngOnInit(): void {
    this.studentList$ = this.studentService.getStudentList()
    console.log(this.studentList$)
  }


}
