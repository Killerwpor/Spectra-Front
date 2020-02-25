import { CompanyPageService } from './page-company-list.service';
import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { CompanyPageInfo } from './page-company-list-info';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-page-company-list',
  templateUrl: './page-company-list.component.html',
  styleUrls: ['./page-company-list.component.css']
})
export class PageCompanyListComponent implements OnInit {

  dot = faCircle;
  data = new CompanyPageInfo();
  lista=new Array();
  response: any;
  userCompany: string;

  company: string;
  constructor(public companyListService: CompanyPageService, private router: Router) {
 
    const navigation = this.router.getCurrentNavigation();
  const state = navigation.extras.state as {
    data: string
  };
  //this.company=state.data;
   }

  ngOnInit() {
    //NOTE Conseguir cual es la empresa del usuario
    // this.data.name = sessionStorage.getItem()
    var userData = JSON.parse(sessionStorage.getItem("sessionData"));
   this.userCompany = userData[userData.length - 1].adminCompany;
    this.data.name=this.userCompany;
    

    this.companyListService.postCompany(this.data).subscribe(
      result =>{
        this.response = result.enterprises;
        if(this.response.result == "Client not found"){
          console.log("No se pudo entrar a la aplicacion");
        }
        else{
         // console.log(this.response);
          //this.lista=this.response;
          this.response.map(item=>{
            this.lista.push(item.name);
          })
        }
      }, error => console.log(error) //Si el servidor no responde, entra por aqui.    

    );
   // console.log(this.company);

 

  }

  companySelected(data){
    const navigationExtras: NavigationExtras = {
      state: {
        data: data
      }
    };

    this.router.navigate(['/dash'], navigationExtras);
  }

  GetCompanies(){
    //NOTE hacer la consulta por los elementos. 
    // this.companyListService.postCompany()
  }

}
