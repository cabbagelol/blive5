import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blive-attrbute-background-type',
  templateUrl: './background-type.component.html',
  styleUrls: ['./background-type.component.css']
})
export class BackgroundTypeComponent implements OnInit {
  @Input() data: any;

  companyType: Array<any> = ['-','px','vh','%'];
  
  // 背景图片值
  backgroundImageValue: any;

  // 默认背景类型
  backgroundTypeRadio: any = '0';

  // 类型背景值 组合
  backgroundValue: any;

  backgroundType: any = [
    {
      'background-image': '',
      'background-size':'auto',
      'background-size-value-w': {
        'value': '',
        'company': 0,
      },
      'background-size-value-h': {
        'value': '',
        'company': 0,
      },
      'background-position-x': {
        'value': '',
        'company': 0,
      },
      'background-position-y': {
        'value': '',
        'company': 0,
      },
      'background-repeat': 'repeat',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  /**
   * 更新背景圖片
   * Background-Image
   * @param e 
   * @param value 
   */
  onBackgroundImageModel (e, value) {
    const self = this;

    self.onUpdataBackground('background-images', value);
  }

  /**
   * 选择单元类型
   */
  onSelectCompanyType (index: number, type: string) {
    const self = this;
    var company = self.companyType[index];
    var value = self.backgroundType[self.backgroundTypeRadio][type].value;

    self.backgroundType[self.backgroundTypeRadio][type].company = index;

    // 选择 ‘-’表示自动，需处理一下
    if (index == 0) {
      company = '';
      value = '';
      self.backgroundType[self.backgroundTypeRadio][type].value = '';
    }

    self.onUpdataAttr({
      [type]: value + company
    });
  }

  /**
   * 寫入屬性
   */
  onUpdataBackground (name, data) {
    const self = this;

    if (Object.keys(self.data).length <= 0) {
      return;
    }

    self.onUpdataAttr({
      [name]: data
    })
    // $(self.data.event.target).css();
  }

  /**
   * 写入属性
   */
  onUpdataAttr (data) {
    const self = this;
    $(self.data.event.target).css(data);
  }

  /**
   * 属性
   * 输入事件
   */
  onAttrInput (value, name: string) {
    const self = this;
    var company = self.companyType[self.backgroundType[self.backgroundTypeRadio][name].company];

    // 单位为默认时 切换为px单位
    if (self.backgroundType[self.backgroundTypeRadio][name].company == 0) {
      self.backgroundType[self.backgroundTypeRadio][name].company = 1;
      company = self.companyType[1]; // px
    }

    self.onUpdataAttr({
      [name]: value + company
    });
  }
}
