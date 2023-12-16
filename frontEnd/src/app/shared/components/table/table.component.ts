import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { clientInterface } from '../../interface/common.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Output()
  statusChange = new EventEmitter()

  @Input()
  data !: clientInterface[]

  @Input()
  searchText !: string


  changeStatus(id: string, status: boolean) {
    this.statusChange.emit({ id, status })
  }


}
