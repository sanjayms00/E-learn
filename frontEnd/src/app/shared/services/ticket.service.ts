import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }


  paymentComplete(): Observable<{firstname: string, lastname: string}>
  {
    return of({firstname: "sanjay", lastname: "m s"})
    // return new Observable(observer=>{
    //   observer.next({firstname: "sanjay", lastname: "ajay"})
    // })
  }


}
