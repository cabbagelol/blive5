import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'blive-staffgauge',
  templateUrl: './staffgauge.component.html',
  styleUrls: ['./staffgauge.component.css']
})
export class StaffgaugeComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
