import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NzTreeComponent} from "ng-zorro-antd";

@Component({
  selector: 'blive-windwos-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.less']
})
export class ConfigureComponent implements OnInit {
  @Output('close') close_ = new EventEmitter<any>();
  @Output('mobanData') mobanData_ = new EventEmitter<any>();
  @ViewChild('nzTreeComponent', {static: false}) nzTreeComponent: NzTreeComponent;
 
  // 菜单列表
  configureMuen: Array<object> = [
    {
      name: '首页',
      nzSelected: true,
      list: [],
    },
    {
      name: '筛选',
      t: true,
      list: [
        {
          name: '账户配置'
        },
        {
          name: '工作台'
        },
        {
          name: '简介信息'
        },
        {
          name: '代码视图'
        },
        {
          name: '快捷键'
        },
      ]
    },
    {
      name: '其他',
      t: true,
      list: [
        {
          name: '关于Blive'
        },
      ]
    }
  ];
  // 选择的菜单
  configureMuenSele: any = "";

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
   * 选择简介模板
   */
  onSelectMuen(data) {
    this.configureMuenSele = data.el.innerText;
  }
}
