import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: object = {
    'moban': false
  }

  constructor() { }

  ngOnInit() {
  }

  /**
   * 菜单窗口开关
   */
  onShowWindow (name) {
    this.menu[name] = this.menu[name] != true;
  }

}
