import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticketInformation: any = {};

  constructor() { }


  paymentComplete(): Observable<{firstname: string, lastname: string}>
  {
    return new Observable(observer=>{
      observer.next({firstname: "sanjay", lastname: "ajay"})
    })
  }


}
