import { CompanyPageService } from './page-company-list.service';
import { Component, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { CompanyPageInfo } from './page-company-list-info';


@Component({
  selector: 'app-page-company-list',
  templateUrl: './page-company-list.component.html',
  styleUrls: ['./page-company-list.component.css']
})
export class PageCompanyListComponent implements OnInit {

  dot = faCircle;
  data = new CompanyPageInfo();

  constructor(public companyListService: CompanyPageService) { }

  ngOnInit() {
    //NOTE Conseguir cual es la empresa del usuario
    // this.data.name = sessionStorage.getItem()
  }

  GetCompanies(){
    //NOTE hacer la consulta por los elementos. 
    // this.companyListService.postCompany()
  }

}
