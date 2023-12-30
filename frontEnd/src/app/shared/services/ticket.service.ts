import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  course !: {
    Information: {
      courseName : string
    }
    // content: {

    // } 
    // options : {}
  }

  constructor() { }

  updateInformation(formData: {courseName : string}){
    this.course.Information = formData
  }

  getInformation(){
    return this.course.Information
  }

  


}
