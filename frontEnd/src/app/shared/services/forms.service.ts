import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  signUpService(signUpData: any){
    return {
      ...signUpData,
      mobile: Number(signUpData.mobile)
    }
  }
}
