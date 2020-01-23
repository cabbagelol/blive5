import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-configure-workbenchstyle',
  templateUrl: './workbenchstyle.component.html',
  styleUrls: ['./workbenchstyle.component.css']
})
export class WorkbenchstyleComponent implements OnInit {
  workbench: any = {
    'ruler': {
      'switch': false
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
