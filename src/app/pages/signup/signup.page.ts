import { DataService } from './../../services/dataservice/data.service';
import { RegisterService } from "../../services/login/register.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { LoadingController } from '@ionic/angular';

import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  emailId: string;
  username: string;
  loginForm: FormGroup;
  password: string;
  password2: string;
  alertmessage: string ;
  constructor(
    public fb: FormBuilder,
    public registerservice: RegisterService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private dataService: DataService
  ) {
    this.loginForm = this.fb.group({
      username: ["1", [Validators.required]],
      password: ["1111", [Validators.required, Validators.minLength(8)]],
      password2: ["1111", [Validators.required, Validators.minLength(8)]],
      emailId: ["11", [Validators.required, Validators.email]],
    });
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
  loginMethod = async (userformarg) => {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    console.log(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      this.loginForm.controls.emailId.value
    );
    this.registerservice
      .registeruser(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value,
        this.loginForm.controls.emailId.value
      )
      .subscribe(
        async (user) => {await loading.dismiss();
          console.log("uses", user);
          this.dataService.setData(11,this.loginForm.controls.username.value);
          //this.dataService.setData(22,this.loginForm.controls.password.value);

          this.router.navigate(["/"]);
        },
        async (err) => {await loading.dismiss();
          console.log("ERR", err.error.message);
          if ("A user with that username already exists" === err.error.message['answer'])
            {  this.alertmessage = "A user with that username already exists";
            this.presentAlert();}
          else if (
            "A user with that emailId already exists" === err.error.message['answer']
          )
            {this.alertmessage = "A user with that emailId already exists";
            this.presentAlert();}
          else{this.alertmessage = "Signin error";
          this.presentAlert();}
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

  paspascheck = () => {
    console.log("paspas", this.loginForm.controls.password.value);

    if (
      this.loginForm.controls.password.value ===
      this.loginForm.controls.password2.value
    ) {
      if (
        !this.loginForm.controls.password2.touched &&
        !this.loginForm.controls.password2.invalid
      )
        this.loginForm.controls.password2.setErrors(null);
      return false;
    } else {
      this.loginForm.controls.password2.setErrors({ incorrect: true });
      return true;
    }
  };
  ngOnInit() {}
}
