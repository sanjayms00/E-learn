import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { clientInterface } from '../../interface/common.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input()
  data !: clientInterface[]

}
