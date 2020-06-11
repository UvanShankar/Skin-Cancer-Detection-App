import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetotp:string;
  loginForm: FormGroup;
  password:string;
  password2:string;
    constructor(public fb :FormBuilder) { this.loginForm = this.fb.group({
      resetotp: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      password2: ['',[Validators.required, Validators.minLength(8)]],
      
      }); }
      
  resetMethod=(userformarg)=>{console.log(this.loginForm);
    console.log("controls",this.loginForm.controls);
  }
  ngOnInit() {
  }

  emailpas=()=>
  {
    if(this.loginForm.controls.password.touched&&this.loginForm.controls.password.invalid)
    return true;
    else false;
  }; 
  
  paspascheck=()=>
  {
console.log("paspas",this.loginForm.controls.password.value);

if(this.loginForm.controls.password.value===this.loginForm.controls.password2.value){
  if(!this.loginForm.controls.password2.touched&&!this.loginForm.controls.password2.invalid)
  this.loginForm.controls.password2.setErrors(null);
  return false;}
else {
  this.loginForm.controls.password2.setErrors({'incorrect':true});
  return true;
  }
}
}
