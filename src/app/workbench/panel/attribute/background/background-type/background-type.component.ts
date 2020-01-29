import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-attrbute-background-type',
  templateUrl: './background-type.component.html',
  styleUrls: ['./background-type.component.css']
})
export class BackgroundTypeComponent implements OnInit {
  // 默认背景类型
  backgroundTypeRadio: any = '3';
  // 类型背景值 组合
  backgroundValue: any;


  constructor() { }

  ngOnInit() {
  }

}
