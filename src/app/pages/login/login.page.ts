import { DataService } from './../../services/dataservice/data.service';
import { LoginService } from "./../../services/login/login.service";
import { LoginPageModule } from "./login.module";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';
 import {Plugins} from '@capacitor/core';
 const{Storage}=Plugins;


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  emailId: string;
  loginForm: FormGroup;
  password: string;
  alertmessage: string ;
  name:string="";
  constructor(
    public fb: FormBuilder,
    public loginservice: LoginService,
    private dataService:DataService,
    private router: Router,
    private route :ActivatedRoute,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {

 
    this.loginForm = this.fb.group({
      password: [this.name, [Validators.required, Validators.minLength(8)]],
      emailId: ["", [Validators.required]],
    });
  }
  ionViewWillEnter(){
    this.ngOnInit();
  }
  async ngOnInit() {
    const prod=await Storage.get({key:"details"})
    console.log("prod",prod);
    if(prod["value"]!=null)
    {
      this.dataService.setData(11,prod["value"]);
       this.router.navigate(["/tabs"]);
    }

    if(this.route.snapshot.data['special'])////getting name from signin page
    {this.name=this.route.snapshot.data['special'];
    this.loginForm.controls['emailId'].setValue(this.name);}
    console.log("logdata",this.name);


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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();


  }
  loginMethod = async (userformarg) => {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    console.log(this.loginForm);
    console.log("controls", this.loginForm.controls);

    this.loginservice
      .loginuser(
        this.loginForm.controls.emailId.value,
        this.loginForm.controls.password.value
      )
      .subscribe(
        async (user) => {
          await loading.dismiss();
          console.log("auth", user);
          this.dataService.setData(11,this.loginForm.controls.emailId.value);
         // const login=JSON.stringify([{

         ///   username:this.loginForm.controls.emailId.value
         // }]);
          await Storage.set({
          key:"details",
          value:this.loginForm.controls.emailId.value})
          this.router.navigate(["/tabs"]);
        },
        async (err) => {
          await loading.dismiss();
          console.log("ERR", err);
          console.log("err", err.error["description"]);
          if ("Invalid credentials" === err.error["description"])
           {// alert("Wrong credentials");
           this.alertmessage = "Wrong credentials";
           this.presentAlert();
          }
          else {
            //alert("Some other error");
            this.alertmessage = "login error";
           this.presentAlert()
          }
        }
      );
  };
  emailval = () => {
    if (
      this.loginForm.controls.emailId.touched &&
      this.loginForm.controls.emailId.invalid
    )
      return true;
    else false;
  };
  emailpas = () => {
    if (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.invalid
    )
      return true;
    else false;
  };

  submit(user) {
    console.log(user);
    //console.log(user.invalid);
  }
  todo = {};
  logForm() {
    console.log(this.todo);
  }
}
