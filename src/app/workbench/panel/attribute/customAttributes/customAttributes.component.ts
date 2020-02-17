import { Component, OnInit, Input } from '@angular/core';

// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-attribute-customAttributes',
  templateUrl: './customAttributes.component.html',
  styleUrls: ['./customAttributes.component.less']
})
export class CustomAttributesComponent implements OnInit {
  @Input() data: any;

  // 标签id
  id: string = '';

  // 标签名称
  tagName: string = '';

  panelsStyle = {
    customStyle: {
        'background': '#fff5f9',
        'color': '#fff5f9',
        'border-bottom': '1px solid rgba(255, 134, 178, 0.05)'
    },
  };

  constructor() { }

  ngOnInit() {
    
  }

  /**
   * 获取标识符
   */
  onUpAttr () {
    const self = this;
    const el = $(self.data.event.target);

    self.id = el.attr('id');
    self.tagName = self.data.event.target.nodeName.toString();
  }

}
