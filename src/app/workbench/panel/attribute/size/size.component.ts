import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-attrbute-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  @Input() data: any;
  @Output('attrChange') attrChange_ = new EventEmitter<any>();

  companyType: Array<any> = ['-','px','vh','%'];

  objectFit: Array<any> = ['fill', 'contain', 'cover','none', 'scale-down'];

  size: any = {
    'object-fit': {
      value: 'none',
      company: 0,
    },
    overflow: {
      value: '',
      company: 0,
    },
    width: {
      value: '',
      company: 0,
    },
    minWidth: {
      value: '',
      company: 0,
    },
    maxWidth: {
      value: '',
      company: 0,
    },
    height: {
      value: '',
      company: 0,
    },
    minHeight: {
      value: '',
      company: 0,
    },
    maxHeight: {
      value: '',
      company: 0,
    }
  }

  constructor() { }

  ngOnInit() {

  }

  /**
   * 更新
   */
  setAttrUp () {
    const self = this;

    if (self.data.event != undefined) {
      for (let i in self.data.event.target.style) {
        let value = (self.data.event.target.style[i] || 0).toString();
        let company = 3;
        self.size[i] = {
          value: 0,
          company: 0,
        }

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

        self.size[i].value = value;
        self.size[i].company = company;
      }

      // Overflow
      switch (self.data.event.target.style.overflow) {
        case 'visible':
        case 'hidden':
        case 'scroll':
          self.size.overflow.value = self.data.event.target.style.overflow;
          break;
        case '':
        case 'auto':
          self.size.overflow.value = 'auto'
          break;
      }
    }
  }

  /**
   * 选择单元类型
   */
  onSelectCompanyType (index: number, type: string) {
    const self = this;
    var company = self.companyType[index];
    var value = self.size[type].value;

    self.size[type].company = index;

    // 选择 ‘-’表示自动，需处理一下
    if (index == 0) {
      company = '';
      value = '';
      self.size[type].value = '';
    }

    self.onUpdataAttr({
      [type]: value + company
    });
  }

  /**
   * 写入属性
   */
  onUpdataAttr (data: object) {
    const self = this;
    $(self.data.event.target).css(data);
    self.attrChange_.emit();
  }

  /**
   * 属性
   * 输入事件
   */
  onAttrInput (value, name: string) {
    const self = this;
    var company = self.companyType[self.size[name].company];

    // 单位为默认时 切换为px单位
    if (self.size[name].company == 0) {
      self.size[name].company = 1;
      company = self.companyType[1]; // px
    }

    if (name == 'overflow' || name == 'object-fit') {
      company = ''
    }

    console.log(value, company)

    self.onUpdataAttr({
      [name]: value + company
    });
  }
}
