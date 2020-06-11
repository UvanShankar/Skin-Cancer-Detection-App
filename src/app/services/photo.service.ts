import { Injectable } from "@angular/core";
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from "@capacitor/core";

const { Camera, Filesystem, Storage } = Plugins;
import { ActivatedRoute, Router } from '@angular/router';

import { Platform } from "@ionic/angular";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { DataService } from './dataservice/data.service';
@Injectable({
  providedIn: "root",
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;
  rooturl = "http://localhost:5000/register";
  selectedimg;
  abc: Blob;
  result: string = null;
  error = null;
  alertmessage:string;
  public diseaseList = 
    {'Melanocytic nevi':1,
    'Melanoma':2,
    'Benign keratosis ':3,
    'Basal cell carcinoma':4,
      'Actinic keratoses':5,
         "Vascular lesions":6,
         'Dermatofibroma':7
      };
  constructor(
    platform: Platform,
    private http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private dataService :DataService,
    private router : Router
  ) {
    this.platform = platform;
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
  public sentrequest() {}

  b64toBlob(b64Data, contentType) {
    contentType = contentType || "";
    const sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto, name: string) {
    const base64Data = await this.readAsBase64(cameraPhoto);
    const fileName = new Date().getTime() + ".jpg";

    fetch(base64Data)
      .then((res) => {
        res
          .blob()
          .then((vsl) => {
            this.abc = vsl;
          })
          .catch((err) => {});
      })
      .then((blob) => {
        console.log(blob);
      });
    /*
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
const fd=new FormData();
//fd.append('image',cameraPhoto.path);
const imageFile = new File([base64Data], fileName, { type: 'image/jpg' })
//fd.append('image',base64Data, fileName);
fd.append('image',imageFile);
fd.append('username',"uvan");
console.log('formdata',fd);
console.log('formdata123',imageFile.toString());
this.http.post('https://skin-cancer-detector-api-api.herokuapp.com/model',fd,{headers: headers}).subscribe(res=>{console.log("httpreqs",res.toString());},err=>{console.log("httpreqe",err.toString())})
console.log('formdata111',fd.toString());

*/
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    /// let body={
    // username:"uvan",
    // image:cameraPhoto.path,
    // };
    // console.log("Jsonify",JSON.stringify(body));
    //console.log("httpreq",this.http.post(this.rooturl,JSON.stringify(body),{headers: headers})
    //.pipe(map(res=>{console.log("users",res)})));

    // Convert photo to base64 format, required by Filesystem API to save
    //const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    //const fileName = new Date().getTime() + '.jpeg';
    console.log("fileName", fileName);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Documents,
    });

    this.selectedimg = await Filesystem.readFile({
      path: fileName,
      directory: FilesystemDirectory.Documents,
    })
      .then((val) => {
        this.selectedimg = val.data;
        console.log("contents1", val.data);
        console.log("contents1", typeof val.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("contents", this.selectedimg);
    console.log("contents", typeof this.selectedimg);
    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    headers.append("Accept", "application/json");
    const fd = new FormData();
    //fd.append('image',cameraPhoto.path);
    var ImageURL = "data:image/jpeg;base64," + base64Data; // Split the base64 string in data and contentType
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1]; // In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = this.b64toBlob(realData, contentType);
    const imageFile = new File([base64Data], fileName, { type: "image/jpg" });
    var img = new Image(); // Create new img element
    img.src = "data:image/jpeg;base64," + this.selectedimg;
    fd.append("image", blob, fileName);
    //fd.append('image',this.selectedimg);
    //fd.append('image',img);
    fd.append("username", name);
    console.log("formdata", fd);
    console.log("formdata123", imageFile.toString());
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
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
            this.dataService.setData(11,this.diseaseList[res["message"]["answer"]]);
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
            this.alertmessage = res["message"]["answer"];
         //   this.presentAlert();
          }
          console.log("res", res);
          console.log("res1", res.toString());
          console.log("res2", res["message"]["answer"]);
        },
        async (err) => {   await loading.dismiss();
          this.alertmessage = "server error timeout";
          this.presentAlert();
          // alert("server error timeout");
          console.log("err", err);
        }
      );
    //this.http.post('https://ae78b5b09297.ngrok.io/model',fd,{headers: headers}).subscribe(res=>{console.log("httpreqs",res.toString());res},err=>{console.log("httpreqe",err.toString())})

    console.log("formdata111", fd.toString());
    ///
    console.log("savedFile", savedFile);
    if (this.platform.is("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
      };
    }
  }

  public async addNewToGallery(name: string) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 50,
    });
    // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto, name);
    //this.photos.unshift(savedImageFile);
    this.photos[0] = savedImageFile;
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: this.platform.is("hybrid")
        ? JSON.stringify(this.photos)
        : JSON.stringify(
            this.photos.map((p) => {
              // Don't save the base64 representation of the photo data,
              // since it's already saved on the Filesystem
              const photoCopy = { ...p };
              delete photoCopy.base64;

              // return photoCopy;
            })
          ),
    });
    return this.result;
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is("hybrid")) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data,
        });

        // Web platform only: Save the photo into the base64 field
        photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is("hybrid")) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
