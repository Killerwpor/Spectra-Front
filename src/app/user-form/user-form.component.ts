import { EventEmitter } from "@angular/core";
import { Component, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  public imagePath;
  imgURL: any;
  public imgUploaded: boolean = false;
  blobUrl: any;
  myRadio: string = '';

  newContact: any;

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
      this.imgURL.replace(/\s+/, "");
      var aux = this.imgURL.split(",");
      this.blobUrl = aux[1];
    };
    this.imgUploaded = true;
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }

  updateValues() {
    // Base64 url of image trimmed one without data:image/png;base64
    var base64 = this.blobUrl;
    // Naming the image
    const date = new Date().valueOf();
    let text = "";
    const possibleText =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    // Replace extension according to your media type
    const imageName = date + "." + text + ".jpeg";
    // call method that creates a blob from dataUri
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: "image/jpeg" });

    let newContact: any = {
      type: this.myRadio,
      photoSrc: imageFile,
      name: (<HTMLInputElement>document.getElementById("inputUsername")).value,
      mail: (<HTMLInputElement>document.getElementById("inputMail")).value,
      phone: (<HTMLInputElement>document.getElementById("inputPhone")).value,
      company: (<HTMLInputElement>document.getElementById("inputCompany"))
        .value,
      documentType: (<HTMLInputElement>document.getElementById("inputIdType"))
        .value,
      documentNumber: (<HTMLInputElement>(
        document.getElementById("inputIdNumber")
      )).value,
      job: (<HTMLInputElement>document.getElementById("inputJob")).value
    };
    //console.log(newContact);
    this.newContact = newContact;
  }

  onItemChange(value) {
    console.log(" Value is : ", value);
  }

  constructor() {}

  ngOnInit() {}
}
