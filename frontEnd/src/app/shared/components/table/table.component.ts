import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { Observable } from 'rxjs';
import { studentInterface } from '../../interface/common.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  pSize = 5;
  currentPage = 1;


  @Output()
  statusChange = new EventEmitter()

  @Input()
  data !: studentInterface[]

  @Input()
  searchText !: string


  changeStatus(id: string, status: boolean) {
    this.statusChange.emit({ id, status })
  }


}
