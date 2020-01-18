import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import api from 'src/public/api';

@Component({
  selector: 'blive-staffgauge',
  templateUrl: './staffgauge.component.html',
  styleUrls: ['./staffgauge.component.css']
})
export class StaffgaugeComponent implements OnInit {
  @Input() data: any;
  @Output('whiteboardsizeSize') whiteboardsizesize = new EventEmitter<any>();

  whiteboardsizeList: any = api.blankSize;

  radioValue = api.blankSize[1].name;

  ngOnInit() {
    console.log(this.data)
  }

  public setWhiteboardsizeSize (item: any) {
    const self = this;
    api.blankSize.forEach(i => {
      if (i.name == self.radioValue) {
        self.whiteboardsizesize.emit(i);
      }
    })
  }

}
