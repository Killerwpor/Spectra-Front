import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faFilePdf, faSignOutAlt, faCog, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

    constructor(private router: Router) {}

  @Output() addCompany = new EventEmitter<any>();

  faFilePdf = faFilePdf;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faBuilding = faBuilding;


  ngOnInit() {
  }

  openCompanyForm(){
    this.addCompany.emit(null);
  }

  changeCompany(){
    this.router.navigate(['/company']);
  }

  logout(){
    this.router.navigate(['/']);
  }

}
