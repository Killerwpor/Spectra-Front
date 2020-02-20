import { SafeHtml } from './../safehtml.pipe';
import { contact } from './../contact';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-contact-panel',
  templateUrl: './contact-panel.component.html',
  styleUrls: ['./contact-panel.component.css']
})
export class ContactPanelComponent implements OnInit {

  @Input() chosen;

  constructor() { }

  ngOnInit() {
  }

}
