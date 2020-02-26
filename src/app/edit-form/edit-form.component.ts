import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  editUser(){
    
    let newContact: any = {
      name: (<HTMLInputElement>document.getElementById("inputUsername")).value,
      mail: (<HTMLInputElement>document.getElementById("inputMail")).value,
      phone: (<HTMLInputElement>document.getElementById("inputPhone")).value,
      job: (<HTMLInputElement>document.getElementById("inputJob")).value
    };
    alert(JSON.stringify(newContact));
  }
}
