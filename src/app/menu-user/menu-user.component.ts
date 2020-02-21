import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faFilePdf, faSignOutAlt, faCog, faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.css']
})
export class MenuUserComponent implements OnInit {

  @Output() addCompany = new EventEmitter<any>();

  faFilePdf = faFilePdf;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faBuilding = faBuilding;

  constructor() { }

  ngOnInit() {
  }

  openCompanyForm(){
    this.addCompany.emit(null);
  }

}
