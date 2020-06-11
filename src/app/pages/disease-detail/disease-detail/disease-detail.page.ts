import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-disease-detail",
  templateUrl: "./disease-detail.page.html",
  styleUrls: ["./disease-detail.page.scss"],
})
export class DiseaseDetailPage implements OnInit {
  public diseaseList: Disesses[] = [
    {
      idd: "1",
      name: "Melanocytic nevi",
      discription:
        "A usually non-cancerous disorder of pigment-producing skin cells commonly called birth marks or moles.This type of mole is often large and caused by a disorder involving melanocytes, cells that produce pigment (melanin).Melanocytic nevi can be rough, flat or raised. They can exist at birth or appear later. Rarely, melanocytic nevi can become cancerous.Most cases don't require treatment, but some cases require removal of the mole.",
    },
    {
      idd: "2",
      name: "Melanoma",
      discription:
        "The most serious type of skin cancer. Melanoma occurs when the pigment-producing cells that give colour to the skin become cancerous.Symptoms might include a new, unusual growth or a change in an existing mole. Melanomas can occur anywhere on the body.Treatment may involve surgery, radiation, medication or in some cases, chemotherapy.",
    },
    {
      idd: "3",
      name: "Benign keratosis-like lesions",
      discription:
        "A non-cancerous skin condition that appears as a waxy brown, black or tan growth.A seborrhoeic keratosis is one of the most common non-cancerous skin growths in older adults. While it's possible for one to appear on its own, multiple growths are more common.Seborrheic keratosis often appears on the face, chest, shoulders or back. It has a waxy, scaly, slightly elevated appearance.No treatment is necessary. If the seborrhoeic keratosis causes irritation, it can be removed by a doctor.",
    },
    {
      idd: "4",
      name: "Basal cell carcinoma",
      discription:
        "A type of skin cancer that begins in the basal cells.Basal cells produce new skin cells as old ones die. Limiting sun exposure can help prevent these cells from becoming cancerous.This cancer typically appears as a white, waxy lump or a brown, scaly patch on sun-exposed areas, such as the face and neck.Treatments include prescription creams or surgery to remove the cancer. In some cases radiation therapy may be required.",
    },
    {
      idd: "5",
      name: "Actinic keratoses",
      discription:
        "A rough, scaly patch on the skin caused by years of sun exposure. Actinic keratoses usually affects older adults. Reducing sun exposure can help reduce risk. It is most common on the face, lips, ears, back of hands, forearms, scalp and neck. The rough, scaly skin patch enlarges slowly and usually causes no other signs or symptoms. A lesion may take years to develop.",
    },
    {
      idd: "6",
      name: "Vascular lesions",
      discription:
        "Vascular lesions are relatively common abnormalities of the skin and underlying tissues, more commonly known as birthmarks. There are three major categories of vascular lesions: Hemangiomas, Vascular Malformations, and Pyogenic Granulomas.",
    },
    {
      idd: "7",
      name: "Dermatofibroma",
      discription:
        " A common type of benign skin tumor that is small, slow-growing, typically firm, red-to-brown bump, seen most often on the legs. Also called a fibrous histiocytoma. It can grow up to about 1 cm (less than a half inch) in diameter. A dermatofibroma consists of a proliferation of scar-like tissue within the deeper layers of the skin (dermis). The cause of dermatofibromas is unknown. They are usually single but sometimes may be multiple. Simple excision is curative.",
    },
  ];
  id: number = 1;
  currentdisease: Disesses;
  currency: string = 'INR';
  razor_key = 'rzp_test_UR1K3QeL0V0fck';
  cardDetails: any = {};
  sum: number = 1;

  constructor(private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.data["special"]) {
      this.id = this.route.snapshot.data["special"];
      this.currentdisease = this.diseaseList[this.id-1 ];
    console.log("ididid",this.diseaseList[this.id ])
    }
   // console.log("logd",this.diseaseList[1])
    console.log("logdataid", typeof(this.id));
    console.log("logdata", this.currentdisease);
  }

  ngOnInit() {}
  test() {
    this.router.navigate(["/tabs"]);
  }
  
  payWithRazor() {
    /*
    var options = {
      description: 'Credits towards consultation',
      image: 'assets/pay.png',
      currency: this.currency, // your 3 letter currency code
      key: this.razor_key, // your Key Id from Razorpay dashboard
      amount: (this.sum * 100), // Payment amount in smallest denomiation e.g. cents for USD
      name: 'foo',
      prefill: {
        email: 'ragulkaarthik007@gmail.com',
        contact: '7598366295',
        name: 'Event Manager'
      },
      theme: {     
        color: 'dodgerblue'
      },
      modal: {
        ondismiss: function () {
          alert('dismissed')
        }
      }
    };
  
    var successCallback = function (payment_id) {
      alert('payment_id: ' + payment_id);
      console.log('payment_id: ',payment_id);
      this.registerService.updatePaymentId(payment_id);
    };
  
    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
      console.log(error.description + ' (Error ' + error.code + ')');
    };
  
    RazorpayCheckout.open(options, successCallback, cancelCallback);
    */
  }
  
}
interface Disesses {
  name: string;
  discription: string;
  idd: string;
}
