import { Injectable } from '@angular/core';
// import { SignUpInterface } from '../interface/common.interface';

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
