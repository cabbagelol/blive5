import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import moban from '../../public/moban';

@Component({
  selector: 'blive-moban-window',
  templateUrl: './moban.component.html',
  styleUrls: ['./moban.component.css']
})
export class MobanComponent implements OnInit {
  @Output('close') close_ = new EventEmitter<any>();

  // 模板列表
  mobanlist: any;

  constructor() { }

  ngOnInit() {
    this.mobanlist = moban.getMobanList();
  }

  /**
   * 关闭
   */
  close (event) {
    if (event.target.className == "blive-moban-window") {
      this.close_.emit();
    }
  }

  /**
   * 选择模板
   */
  onSelectTemplate () {

  }
}
