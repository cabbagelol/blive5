import { Component, OnInit, Input } from '@angular/core';
import api from '../../public/api';

// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-component-attributeGrid',
  templateUrl: './attributeGrid.component.html',
  styleUrls: ['./attributeGrid.component.css']
})
export class AttributeGridComponent implements OnInit {
  @Input() data: any;

  evnetdata: any = [];

  elementBlackList: any = api.elementBlackList;

  value: any = {
    add: {
      e: '',
      v: ''
    }
  };

  event: any;

  nodeName: string = '';

  //过滤
  filterWhitelist = {
    'css-float': true,
    'css-text': true,
    'item': true,
    'get-property-value': true,
    'get-property-priority': true,
    'set-property': true,
    'remove-property': true,
    'parent-rule': true,
    'length': true
  }


  // 对照
  colors = {
    'maroon': true,
    'darkred': true,
    'brown': true,
    'firebrick': true,
    'crimson': true,
    'red': true,

    'mediumvioletred': true,
    'palevioletred': true,
    'deeppink': true,
    'fuchsia(magenta)': true,
    'hotpink': true,
    'pink': true,
    'lightpink': true,
    'mistyrose': true,
    'lavenderblush': true,

    'indigo': true,
    'purple': true,
    'darkmagenta': true,
    'darkorchid': true,
    'blueviolet': true,
    'darkviolet': true,
    'slateblue': true,
    'mediumpurple': true,
    'mediumslateblue': true,
    'mediumorchidmediumorchid': true,
    'violet': true,
    'plum': true,
    'thistle': true,
    'lavender': true,

    'saddlebrown': true,
    'sienna': true,
    'chocolate': true,
    'indianred': true,
    'rosybrown': true,
    'lightcoral': true,
    'salmon': true,
    'lightsalmon': true,
    'orangered': true,
    'tomato': true,
    'coral': true,
    'darkorange': true,
    'sandybrown': true,
    'peru': true,
    'tan': true,
    'burlywood': true,
    'wheat': true,
    'moccasin': true,
    'navajowhite': true,
    'peachpuff': true,
    'bisque': true,
    'antiquewhite': true,
    'papayawhip': true,
    'cornsilk': true,
    'oldlace': true,
    'linen': true,
    'seashell': true,
    'snow': true,
    'floralwhite': true,
    'ivory': true,

    'darkgoldenrod': true,
    'goldenrod': true,
    'gold': true,
    'yellow': true,
    'darkkhaki': true,
    'khaki': true,
    'palegoldenrod': true,
    'beige': true,
    'lemonchiffon': true,
    'lightgoldenrodyellow': true,
    'lightyellow': true,

    'darkslategray': true,
    'darkolivegreen': true,
    'olive': true,
    'darkgreen': true,
    'forestgreen': true,
    'seagreen': true,
    'green(teal)': true,
    'madiumaquamarine': true,
    'yellowgreen': true,
    'limegreen': true,
    'lime': true,
    'chartreuse': true,
    'lawngreen': true,
    'greenyellow': true,
    'mediumspringgreen': true,
    'springgreen': true,
    'lightgreen': true,
    'palegreen': true,
    'aquamarine': true,
    'honeydew': true,
    'mintcream': true,

    'midnightblue': true,
    'navy': true,
    'darkblue': true,
    'darkslateblue': true,
    'mediumblue': true,
    'royalblue': true,
    'dodgerblue': true,
    'cornflowerblue': true,
    'deepskyblue': true,
    'lightskyblue': true,
    'lightsteelblue': true,
    'lightblue': true,
    'steelblue': true,
    'darkcyan': true,
    'cadetblue': true,
    'darkturquoise': true,
    'mediumturquoise': true,
    'turquoise': true,
    'skyblue': true,
    'powderblue': true,
    'paleturquoise': true,
    'lightcyan': true,
    'azure': true,
    'aliceblue': true,
    'aqua(cyan)': true,

    'black': true,
    'dimgray': true,
    'gray': true,
    'slategray': true,
    'lightslategray': true,
    'darkgray': true,
    'silver': true,
    'lightgray': true,
    'gainsboro': true,
    'whitesmoke': true,
    'ghostwhite': true,
    'white': true,
  };

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    const self = this;

    // 是否已选择标签
    if (!self.data) {
      return;
    }

    

    this.getAttrList(self.data.event);
  }

  /**
   * 读取Dom属性
   */
  getAttrList(event: any) {
    const self = this;
    var data_ = [];
    var windos_ = window;

    console.log(event)

    self.event = event;
    self.nodeName = event.target.nodeName.toLocaleLowerCase();

    for (let i in event.target.style) {
      if (!self.isNumber(i) && !self.filterWhitelist[self.toLine(i)]) {
        var _t;

        if (event.target.style.getPropertyValue) {
          // 还原值最高
          _t = event.target.style.getPropertyValue(self.toLine(i));
        } else {
          // 兼容
          _t = event.target.style.getAttribute(i) || windos_.getComputedStyle(event.target, null)[self.toLine(i)]  || event.target.style[i]
        }

        data_.push({
          name: self.toLine(i),
          fname: i,
          value: _t,
          isColor: self.isCheckIsColor(_t),
          checked: true,
        });
      }
    }
    self.evnetdata = data_;
  }


  /**
   * 属性更新
   */
  onUpAttr(name, value) {
    const self = this;

    $(self.data.event.target).css({
      [name]: value.trimRight().trimLeft()
    });

    self.getAttrList(self.event);
  }


  /**
   * 更新值
   * 失焦 
   */
  setBlurAttrbute(event, i) {
    const self = this;

    self.evnetdata.forEach(di => {
      if (di.name == i.name) {
        di.value = event.target.innerText.trimRight().trimLeft();
        self.onUpAttr(i.name, event.target.innerText);
      }
    });

  }

  toLine(name) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  isNumber(value) {
    const reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
    var patt = new RegExp(reg);
    return patt.test(value);
  }

  /**
   * 
   */
  onInput(value, name) {
    const self = this;

    self.value.add[name] = value;
  }

  /**
   * 是否颜色字符串
   */
  isCheckIsColor(bgVal) {
    const self = this;
    var type = "^#[0-9a-fA-F]{6}$";
    var re = new RegExp(type);
    if (bgVal.match(re) == null) {
      type = "^[rR][gG][Bb][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\)]{1}$";
      re = new RegExp(type);
      if (bgVal.match(re) == null) {
        if (self.colors[bgVal.toString()]) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
