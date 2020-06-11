import { ActivatedRoute, Router } from '@angular/router';
import { Component } from "@angular/core";
import { PhotoService } from "../services/photo.service";

import { HttpClientModule, HttpHeaders } from "@angular/common/http";

import { HttpClient } from "@angular/common/http";
import { AlertController, Platform } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';

import {Plugins} from '@capacitor/core';
import { DataService } from '../services/dataservice/data.service';
const{Storage}=Plugins;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  selectedimg;
  imageSrc = null;
  httres;
  httperr;
  msg: string;
  alertmessage: string;
  data:any;
  url: any;
  public diseaseList = 
    {'Melanocytic nevi':1,
    'Melanoma':2,
    'Benign keratosis ':3,
    'Basal cell carcinoma':4,
      'Actinic keratoses':5,
         "Vascular lesions":6,
         'Dermatofibroma':7};
  
  constructor(
    public photoService: PhotoService,
    private http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private route :ActivatedRoute,
    private router : Router,
    private alertCtrl: AlertController,
    private dataService :DataService,
    private platform: Platform
  
  ) {
    this.platform.backButton.subscribeWithPriority(10, async () => {
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
      console.log('Backbutton Handler was called!');
    });

  }
  ionViewWillEnter(){
    this.ngOnInit();
  }
  async ngOnInit() {
    this.imageSrc = null;

    const prod=await Storage.get({key:"details"})
    console.log("prod",prod);
    if(prod["value"]!=null)
    {
      this.data=prod["value"];
    }
else
    if(this.route.snapshot.data['special'])
    this.data=this.route.snapshot.data['special'];
    console.log("logdata",this.data);

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "SkinCancerApp",
      subHeader: "Alert",
      message: this.alertmessage,
      buttons: ["OK"],
    });

    await alert.present();
  }
  clickEvent(){
    document.getElementById("fileId").click();
  }
  onfileselected(event) {
    console.log("huyfr", event);
    this.selectedimg = event.target.files[0];
    this.url= event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => {
      // called once readAsDataURL is completed
      this.photoService.photos=[];
      this.imageSrc = event.target.result;
      this.onbtnselected(event);
    };
    // this.presentAlert();
  }
 
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
  async onbtnselected(event) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    console.log("huyfr", event);
    console.log("selectede", this.selectedimg);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    const fd = new FormData();
    fd.append("image", this.selectedimg);
    fd.append("username", this.data);
    console.log("formdata", fd);
    console.log("formdata", this.selectedimg.toString());

    this.http
      .post("https://skin-cancer-detector-api-api.herokuapp.com/model", fd, {
        headers: headers,
      })
      .subscribe(
        async (res) => {   await loading.dismiss();
          if (res["message"]["answer"] == "invalid username") {
            //alert("wrong username");
            this.alertmessage = "wrong username";
            this.presentAlert();
          } else if (
            res["message"]["answer"] == "max limit reached convert to premium"
          ) {
            // alert("max limit reached convert to premium");
            this.alertmessage = "max limit reached convert to premium";
            this.presentAlert();
          } else if(res["message"]["answer"] == "no skin"){
            this.alertmessage = "Cover only the skin and use flash.The image should be bright ";
            this.presentAlert();
          }
          
          else {
            this.httres = res["message"]["answer"];
            this.alertmessage = this.httres;
            this.dataService.setData(11,this.diseaseList[res["message"]["answer"]]);
           
           console.log("this.diseaseList[res]",this.diseaseList[res["message"]["answer"]]);
             
           

            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              header: 'Confirm!',
              message: res["message"]["answer"],
              buttons: [
                 {
                  text: 'Details',
                  handler: async () => {
                    this.router.navigate(["/disease-detail"]);
                  }
                }
              ]
            });
        
            await alert.present();
          }
          console.log("res", res);
          console.log("res1", res.toString());
          console.log("res2", res["message"]["answer"]);
        },
        async (err) => {   await loading.dismiss();
          this.alertmessage = "server error timeout";
          this.presentAlert();
          // alert("server error timeout");
          this.httperr = err;
          console.log("err", err);
        }
      );
  }
  onphotobtn(event) {
    this.imageSrc=null;
    var sss = this.photoService.addNewToGallery(this.data);
  }
 
}
