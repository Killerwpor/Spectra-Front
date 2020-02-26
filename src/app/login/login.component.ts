import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserLoginInfo } from "../userLoginInfo";
import { Component, OnInit, Input, Injectable } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  private data = new UserLoginInfo();
  res: any;
  error=""

  constructor(public logService: LoginService, private router: Router) {}
  
  inputUsername: string;
  inputPass: string;

  response: any;

  TryLogin() {
 
    
    this.data.email = this.inputUsername;
    this.data.password = this.inputPass;

    
    this.logService.postLogin(this.data).subscribe(
      result =>{
        this.response = result;
        if(this.response.result == "User not found"){
          console.log("No se pudo entrar a la aplicacion");
        }
        else{
          var userCompany = this.response[this.response.length - 1].adminCompany;
          var data={
            email: this.data.email,
            password: this.data.password,
            company: userCompany
          }
          if(JSON.parse(sessionStorage.getItem("credentials"))==null){
            var credentials={
              email: this.data.email,
              password: this.data.password
            }
            sessionStorage.setItem('credentials',JSON.stringify(credentials));
          }
          sessionStorage.setItem('sessionData',JSON.stringify(data));
          this.router.navigate(['/company']);
          console.log(this.response);
        }
      }, error => this.handleError(error) //Si el servidor no responde, entra por aqui.
    

    );

  }

  handleError(error){
    alert("Error en el servidor, compruebe que este encendido por favor.");
    }


  ngOnInit() {}
}
