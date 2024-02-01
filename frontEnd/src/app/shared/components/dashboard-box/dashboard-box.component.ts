import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-box',
  templateUrl: './dashboard-box.component.html'
})
export class DashboardBoxComponent {

  @Input() title: string = ''
  @Input() value: number = 0
  @Input() icon: string = ''
  @Input() color: string = ''

}
