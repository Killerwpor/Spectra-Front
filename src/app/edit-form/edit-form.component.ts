import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EditService } from "./edit-form.service";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  response: string;
  public imagePath;
  imgURL: any;
  public imgUploaded: boolean = false;
  blobUrl: any;
  myRadio: string = '';

  @Input() chosen;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(public editService: EditService) { }

  ngOnInit() {
   console.log("ID: "+this.chosen.id);
  }

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

  editUser(){

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
      id: this.chosen.id,
      name: (<HTMLInputElement>document.getElementById("inputUsername")).value,
      email: (<HTMLInputElement>document.getElementById("inputMail")).value,
      phone: (<HTMLInputElement>document.getElementById("inputPhone")).value,
      job: (<HTMLInputElement>document.getElementById("inputJob")).value,
      photo: imageFile
    };
    
    
    this.editService
    .editUser(newContact)
    .subscribe(result => {
    alert("El usuario "+this.chosen.name+" se ha editado con éxito");
    this.returnToDash();
    });
    

  }

  returnToDash() {
    this.close.emit(null);
    
  }
}
