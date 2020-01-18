import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'blive-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output('mobanToggle') mobanToggle_ = new EventEmitter<any>();

  menu: object = {
    'moban': false,
    'configure': false,
  }

  constructor() { }

  ngOnInit() {
  }

  /**
   * 菜单窗口开关
   */
  onShowWindow (name: any) {
    this.menu[name] = this.menu[name] != true;
  }

  /**
   * 获取模板
   * 模板对象信息
   */
  setMobanData (data: any) {
    this.mobanToggle_.emit(data || {});
  }
}
