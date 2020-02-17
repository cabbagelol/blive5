import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'blive-attrbute-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  @Input() data: any;
  @Output('attrChange') attrChange_ = new EventEmitter<any>();

  // 单位
  companyType: Array<any> = ['-', 'px', 'vh', '%'];

  // 文字属性
  typography: any = {
    'font-weight': {
      'value': 0,
      'list': [
        '100',
        '200',
        '300',
        '400 - normal',
        '500',
        '600',
        '700 - bold',
        '800',
      ]
    },
    'font-size': {
      'value': 0,
      'company': 0,
    },
    'line-height': {
      'value': 0,
    },
    'color': {
      'value': '#000000',
    },
    'text-align': {
      'value': 'left',
      'list': [
        'left',
        'center',
        'right',
        'justify'
      ]
    }
  };

  constructor() { }

  ngOnInit() {
  }

  /**
   * 读取属性
   */
  getAttrUp() {
    const self = this;
    console.log(self.data.event.target.style.color);

    /**
     * 赋予面板上所需的字段属性
     */
    var f0 = self.data.event.target.style.fontWeight;
    switch (f0) {
      case '700':
      case 'bold':
        f0 = '700 - bold';
        break;
      case '':
        f0 = '400 - normal';
        break;
    }
    self.typography['font-weight'] = Object.assign(self.typography['font-weight'], {
      'value': f0,
    });

    var f1 = self.isCompanyLeve(self.data.event.target.style.fontSize);
    self.typography['font-size'] = Object.assign(self.typography['font-size'], {
      'value': f1.value,
      'company': f1.company,
    });

    var f2 = self.isCompanyLeve(self.data.event.target.style.lineHeight);
    self.typography['line-height'] = Object.assign(self.typography['line-height'], {
      'value': f2.value,
      'company': f2.company,
    });

    var f3 = self.data.event.target.style.color;
    self.typography['color'] = Object.assign(self.typography['color'], {
      'value': f3,
    });

    var f4 = self.data.event.target.style.textAlign;
    self.typography['text-align'] = Object.assign(self.typography['text-align'], {
      'value': f4,
    });
  }

  /**
   * 检查单位等级
   */
  isCompanyLeve(value) {
    var company = 0;
    if (value.indexOf('px') >= 0) {
      value = value.replace('px', '');
      company = 1;
    } else if (value.indexOf('vh') >= 0) {
      value = value.replace('vh', '');
      company = 2;
    } else if (value.indexOf('%') >= 0) {
      value = value.replace('%', '');
      company = 3;
    } else {
      value = '';
      company = 0;
    }
    return {
      value,
      company,
    }
  }

  /**
   * 选择单元类型
   */
  onSelectCompanyType(index: number, type: string) {
    const self = this;
    var company = self.companyType[index];
    var value = self.typography[type].value;

    self.typography[type].company = index;

    // 选择 ‘-’表示自动，需处理一下
    if (index == 0) {
      company = '';
      value = '';
      self.typography[type].value = '';
    }

    self.onUpdataAttr({
      [type]: value + company
    });
  }

  /**
   * 写入属性
   */
  onUpdataAttr(data: any) {
    const self = this;
    $(self.data.event.target).css(data);
    self.attrChange_.emit();
  }

  /**
   * 选择器
   */
  onSelectAttr(value, name) {
    const self = this;

    self.onUpdataAttr({
      [name]: value
    });
  }

  /**
   * 属性
   * 输入事件
   */
  onAttrInput(value, name: string) {
    const self = this;
    var company = self.companyType[self.typography[name].company];

    // 单位为默认时 切换为px单位
    if (self.typography[name].company == 0) {
      self.typography[name].company = 1;
      company = self.companyType[1]; // px
    }

    self.onUpdataAttr({
      [name]: value + company
    });
  }

  /**
   * 更新文字字体
   */
  changeTypographyColor (event) {
    const self = this;
    var color = "";
    switch(event.color.source){
      case 'hsva':
        let hsva = event.color.hsl;
        color = `hsla(${hsva.h}, ${hsva.s.toFixed(2) * 100}%, ${hsva.l.toFixed(2) * 100}%, ${hsva.a})`;
        break;
      case 'rgb':
        let hsv = event.color.rgb;
        color = `rgba(${hsv.r}, ${hsv.g}, ${hsv.b}, ${hsv.a})`;
        break;
        // backgroundColorValue = event.color.hex;
        // break;
      case 'hsla':
        let hsla = event.color.hsl;
        color = `hsla(${hsla.h}, ${hsla.s}, ${hsla.l}, ${hsla.a})`;
        break; 
    }
    self.typography.color.value = color;
    self.onSelectAttr(color, 'color');
  }
}
