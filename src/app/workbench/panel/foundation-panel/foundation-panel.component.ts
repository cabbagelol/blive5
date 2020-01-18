import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'blive-foundation-panel',
  templateUrl: './foundation-panel.component.html',
  styleUrls: ['./foundation-panel.component.css']
})
export class FoundationPanelComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {

  }

}
