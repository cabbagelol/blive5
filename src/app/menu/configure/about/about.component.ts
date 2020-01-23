import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'blive-configure-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutContributionList: Array<any> = [
    {
      img: '942892881',
      name: '柚紫',
      describe: '群管理'
    },
    {
      img: '441478965',
      name: 'LOVE司',
      describe: '整理简介模板分类管理'
    },
    {
      img: '652737049',
      name: '卫宫祁',
      describe: '反馈意见，教程视频制作'
    },
    {
      img: '2048412928',
      name: '弱音の羽',
      describe: '贡献功能性代码'
    },
    {
      img: '37236453',
      name: '疯溅！脑浆姬！',
      describe: '画师'
    },
    {
      img: '925060467',
      name: '月落红',
      describe: '图床服务'
    },
    {
      img: '437852872',
      name: '任先森',
      describe: '群管理'
    },
    {
      img: '',
      name: 'EchoXiaoze',
      describe: '教程视频制作'
    },
    {
      img: '2210075011',
      name: '氵青风丶',
      describe: '群管理'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
