import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from "@ngrx/store";
import { clientInterface } from 'src/app/shared/interface/client.interface';
import { clientSignUp } from 'src/app/shared/store/actions/client.action';
import { SignUpInterface } from 'src/app/shared/interface/common.interface';


@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  signUpForm !: FormGroup

  constructor(
    private store: Store<{client: clientInterface}> 
    ){}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fName : new FormControl(''),
      lName : new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
      confirmPassword : new FormControl('')
    })
  }

  signUp(){
    const signUpdata: SignUpInterface = this.signUpForm.value;
    this.store.dispatch(clientSignUp({signUpdata}))
  }


}
