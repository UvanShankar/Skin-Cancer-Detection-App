import { Component } from '@angular/core';
import { AlertController } from "@ionic/angular";

import {  Router } from '@angular/router';

import {Plugins} from '@capacitor/core';
const{Storage}=Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public alertController: AlertController,
    private router : Router,) {}
  async logoutbtn(event)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to logout',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Logout',
          handler: async () => {
            const prod=await Storage.clear();

            console.log('Confirm Okay',prod);
            this.router.navigate(["/"]);
          }
        }
      ]
    });

    await alert.present();
  }
}
