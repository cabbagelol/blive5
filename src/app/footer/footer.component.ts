import { Component, OnInit } from '@angular/core';
import api from '../../public/api';

@Component({
  selector: 'blive-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  appVersion: string = api.appVersion;

  constructor() { }

  ngOnInit() {
  }

}
