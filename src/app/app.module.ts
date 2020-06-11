import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/login/register.service';
import { CommonModule } from '@angular/common';
import {  }   from '@angular/forms';


//import { MatFormFieldModule } from '@angular/material/form-field';
//import { MatInputModule } from '@angular/material/input';
//import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot() , AppRoutingModule,
  HttpClientModule,FormsModule, ReactiveFormsModule,CommonModule
   ],
  providers: [   LoginService,RegisterService,

    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  exports:[ReactiveFormsModule,FormsModule]
})
export class AppModule {}
