import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    IonicModule,ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage],
  entryComponents:[LoginPage]
})
export class LoginPageModule {

  submit(user){
    console.log(user);
  }
}
