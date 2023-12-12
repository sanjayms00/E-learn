import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  togg = true
  icon = "/assets/logo/grid.svg"

  toggleClick(event: HTMLElement){
    this.togg = !this.togg
    console.log(event.classList.toggle('top-[15%]'))
    if(this.togg){
      this.icon = "/assets/logo/grid.svg"
    }else{
      this.icon = "/assets/logo/close.svg"
    }
  }
  
}
