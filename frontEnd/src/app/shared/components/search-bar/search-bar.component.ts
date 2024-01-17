import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  searchData = ''

  @Output()
  searchEvent = new EventEmitter<string>()


  search() {
    this.searchEvent.emit(this.searchData)
  }

}
