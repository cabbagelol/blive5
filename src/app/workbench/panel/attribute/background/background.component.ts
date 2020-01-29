import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-attrbute-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})

export class BackgroundComponent implements OnInit {
  backgroundImagesList: Array<any> = [
      1,2
  ];
  // 背景图片值
  backgroundImageValue: any;
  // 背景颜色值
  backgroundColorValue: any;

  constructor() { }

  ngOnInit() {
  }

}
