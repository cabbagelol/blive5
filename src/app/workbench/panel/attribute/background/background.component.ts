import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-attrbute-background',
  templateUrl: './background.component.html',
<<<<<<< HEAD
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
=======
  styleUrls: ['./background.component.css']
})

export class BackgroundComponent implements OnInit {
>>>>>>> 886133a888c41c9337013d3c21c50a43e9f56dea

  constructor() { }

  ngOnInit() {
  }

}
