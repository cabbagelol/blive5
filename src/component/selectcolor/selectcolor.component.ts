import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-color',
  templateUrl: './selectcolor.component.html',
  styleUrls: ['./selectcolor.component.css']
})

export class SelectcolorComponent implements OnInit {
  ngOnInit(): void {
  }

  // 初始化颜色是从父组件中传递过来的，属性
  @Input() color: string;

  // 选择颜色以后调用父组件中的方法，将数据传递出去，方法
  @Output() sentColor = new EventEmitter();

  // 方向
  @Input() cpPosition: string = "right";

  // 当选择颜色以后
  changeComplete() {
      this.sentColor.emit(this.color);
  }
}
