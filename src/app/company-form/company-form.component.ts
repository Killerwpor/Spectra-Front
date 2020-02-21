import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SimulatorFormComponent } from "./../simulator-form/simulator-form.component";
import { FormAddService } from "./company-form.service";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit {


@ViewChild(SimulatorFormComponent, { static: false })
simForm: SimulatorFormComponent;

response: any;
  
  @Input() simulatorList: string;


  constructor(public formAddService: FormAddService) {}

  ngOnInit() {
  }

  

  save(){
    var inputCompany= (<HTMLInputElement>document.getElementById("inputCompany")).value; 
    var userData = JSON.parse(sessionStorage.getItem("sessionData"));
    var userCompany = userData[userData.length - 1].adminCompany;
    var newCompanyData={
companyName: inputCompany,
simulators: this.simForm.addArray,
clientName: userCompany
    }

    this.formAddService
    .postAddForm(newCompanyData)
    .subscribe(result => {
      console.log("RESULTADO: "+result);
    });   

}
}
