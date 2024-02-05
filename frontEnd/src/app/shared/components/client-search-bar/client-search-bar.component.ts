import { Output, EventEmitter, Component, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-client-search-bar',
  templateUrl: './client-search-bar.component.html'
})
export class ClientSearchBarComponent implements OnInit {
  @ViewChild('searchBar', { static: true }) searchInput!: ElementRef;

  searchText = '';
  @Output() SearchEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    this.searchInput.nativeElement.focus()

  }


  //emit event
  searchClick() {
    this.SearchEvent.emit(this.searchText)
  }
}
