import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench-imgattr',
  templateUrl: './img-attr.component.html',
  styleUrls: ['./img-attr.component.css']
})
export class ImgAttrComponent implements OnInit {
  @Input() data: any;
  @Output('imgAttrChange') imgAttrChange_ = new EventEmitter<any>();
  @Output('imgAttrClose') imgAttrClose_ = new EventEmitter<any>();

  // window
  public window: any = $(window);
  // 图片属性
  imgAttr: any  = {
    src: '',
    alt: '描述内容',
    title: '',
    width: 0,
    height: 0,
    size: 0,
    x: 0,
    y: 0,
  };

  constructor() { }

  ngOnInit() {
    const self = this;
    const imgFilterEvent = $('.blive-imgAttr-box');

    self.window = $(window);
    self.imgAttr.x = self.window.width() / 2 - 200
    self.imgAttr.y = (self.window.height() / 2) - parseInt(imgFilterEvent.height()) / 2;

    self.imgAttr.src = self.data.workbenchSelectorController.target.currentSrc;
    self.imgAttr.width = self.data.workbenchSelectorController.target.naturalWidth;
    self.imgAttr.height = self.data.workbenchSelectorController.target.naturalHeight;
    self.imgAttr.size = performance.getEntriesByName(self.data.workbenchSelectorController.target.currentSrc)[0]['encodedBodySize'] || 0;
    self.imgAttr.alt = self.data.workbenchSelectorController.target.alt;
    self.imgAttr.title = self.data.workbenchSelectorController.target.title;
    console.log(self.data.workbenchSelectorController);
  }

  /**
   * 更变图片属性
   */
  onChange () {
    const self = this;
    self.onClose();
    self.imgAttrChange_.emit(self.imgAttr);
  }

  /**
   * 关闭
   */
  onClose () {
    this.imgAttrClose_.emit();
  }
}
