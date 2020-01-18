import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NzTreeComponent} from "ng-zorro-antd";

@Component({
  selector: 'blive-windwos-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  @Output('close') close_ = new EventEmitter<any>();
  @Output('mobanData') mobanData_ = new EventEmitter<any>();

  @ViewChild('nzTreeComponent', {static: false}) nzTreeComponent: NzTreeComponent;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 关闭
   */
  close(event) {
    if (event == "event" || event.target.className == "blive-configure-window") {
      this.close_.emit();
    }
  }

  /**
   * 选择模板
   */
  onSelectTemplate(data) {
    this.close('event');
    this.mobanData_.emit(data);
  }

}
