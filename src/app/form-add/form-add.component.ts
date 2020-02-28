import { LoginService } from "./../login/login.service";
import { UserFormComponent } from "./../user-form/user-form.component";
import { SimulatorFormComponent } from "./../simulator-form/simulator-form.component";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { FormAddService } from "./form-add.service";

@Component({
  selector: "app-form-add",
  templateUrl: "./form-add.component.html",
  styleUrls: ["./form-add.component.css"]
})
export class FormAddComponent implements OnInit {
  @ViewChild(SimulatorFormComponent, { static: false })
  simForm: SimulatorFormComponent;
  @ViewChild(UserFormComponent, { static: false }) userForm: UserFormComponent;

  @Input() simulatorList;
  @Output() close: EventEmitter<any> = new EventEmitter();
  addForm: any[] = [];
  response: any;

  constructor(public formAddService: FormAddService, public loginService: LoginService) {}

  ngOnInit() {
    this.prepareSimFormInput(this.simulatorList);
  }

  prepareSimFormInput(simList) {
    for (let i = 0; i < simList.length; i++) {
      let sim: any = {
        name: simList[i].name,
        icon: simList[i].icon
      };
      this.addForm.push(sim);
    }
  }

  sendNewUser() {
    var simFormData = this.simForm.addArray;
    this.userForm.updateValues();
    var userFormData = this.userForm.newContact;

    var newUserPhoto = userFormData.photoSrc;

    var newUserData: any = {
      //photo: userFormData.photoSrc,
      type: userFormData.type,
      name: userFormData.name,
      email: userFormData.mail,
      phone: userFormData.phone,
      company: userFormData.company,
      documentType: userFormData.documentType,
      documentNumber: userFormData.documentNumber,
      job: userFormData.job,
      simulators: simFormData
    };

    this.formAddService
      .postAddForm(newUserPhoto, newUserData)
      .subscribe(result => {
        this.response = result;
        if (this.response != null) {
          
         var datos= JSON.parse(sessionStorage.getItem("credentials"));
         var companySelected= JSON.parse(sessionStorage.getItem("companySelected"));
          var data={
            email: datos.email,
            password: datos.password,
            companyName: companySelected.name
          }
          
          this.loginService
          .postLogin2(data)
          .subscribe(result=>{
            sessionStorage.removeItem("sessionData");
            sessionStorage.setItem('sessionData',JSON.stringify(result));
            this.returnToDash();
          })

         
        } else {
          console.log("la operacion fallo");
          console.log(this.response);
        }
      });
  }

  returnToDash() {
    // var JSONdata = sessionStorage.getItem("userData");
    // var data = JSON.parse(JSONdata);

    // this.logService.postLogin(data).subscribe(result => {
    //   this.response = result;
    //   if (this.response.result == "User not found") {
    //     console.log("No se pudo entrar a la aplicacion");
    //   } else {
    //     console.log("Se actualizo la lista de contactos");
    //     sessionStorage.removeItem("sessionData");   
    //     sessionStorage.setItem('sessionData',JSON.stringify(this.response)); 
    //   }
    // });
    this.close.emit(null);
    
  }
}
