import { Output, EventEmitter, Component } from '@angular/core';

@Component({
  selector: 'app-client-search-bar',
  templateUrl: './client-search-bar.component.html'
})
export class ClientSearchBarComponent {
  searchText = '';
  @Output() SearchEvent = new EventEmitter();

  //emit event
  searchClick() {
    this.SearchEvent.emit(this.searchText)
  }
}
