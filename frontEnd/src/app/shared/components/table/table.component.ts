import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {

  p: number = 1;

  @Input() menu!: string[]
  @Input() list!: any
  @Output() status = new EventEmitter()

  changeStatus(id: string, status: boolean) {
    this.status.emit({ id, status })
  }
}
