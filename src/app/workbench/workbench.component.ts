import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})

export class WorkbenchComponent implements OnInit {
  workbenchInfo;
  fluoroscopy;
  fluoroscopeShowState = false;
  workbenchData = {
	  's': 1,
	  'top': 0,
	  'left': 0,
  };

  /// 选择器坐标位置
  workbenchSelectorController = {
    'top': 0,
    'left': 0,
    'width': 0,
    'height': 0,
  };

  constructor(private _sanitizer: DomSanitizer) {}

  async ngOnInit() {
	this.workbenchInfo = $($('#blive-workbench')[0]);
    this.fluoroscopy = $('#blive-fluoroscopy > div');

    await this.setWorkbenchReady();
    await this.onEventProxy();
  }

  async setWorkbenchReady () {
    const self = this;
    const box = $('.blive-workbench');
    self.workbenchData.left = (box.width() / 2) - (self.workbenchInfo.width() / 2);
    self.workbenchData.top = (box.height() / 2) -  (self.workbenchInfo.height() / 2);
    self.workbenchInfo.attr(
        "style",
        `left: calc(50% - ${self.workbenchInfo.width() / 2}px); top: calc(50% - ${self.workbenchInfo.height() / 2}px)`
    );

	this.onWorkController();
	this.onInput();
  }

  /**
   * 工作台控制
   * 滑动 放大
   */
  onWorkController () {
	  var self = this;
	  
    $('.blive-workbench').mousedown(function(e){
          var positionDiv = self.workbenchInfo.offset();
          var distenceX = e.pageX - positionDiv.left;
          var distenceY = e.pageY - positionDiv.top;

          $('.blive-workbench').css({
            "cursor": "grabbing",
          });

          $(document).mousemove(function(e){
            var x = e.pageX - distenceX;
            var y = e.pageY - distenceY;

            if (e.target.className != "blive-workbench") {
              return;
            }

            self.workbenchData.top = y;
            self.workbenchData.left = x;
            self.fluoroscopy.css({
              'top': `${self.workbenchData.top + self.workbenchSelectorController.top}px`,
              'left': `${self.workbenchData.left + self.workbenchSelectorController.left}px`,
            });

            self.workbenchInfo.css({
              'left':x+'px',
              'top':y+'px'
            });
        });

        // 释放
        $(document).mouseup(function(){
          $(document).off('mousemove');
          $('.blive-workbench').css({
            "cursor": "grab"
          });
        });
    }).on("mousewheel DOMMouseScroll", function (e) {

      return;
      /// 放大
      /// 禁用中
      const delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
          // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
      if (delta > 0 && self.workbenchData.s < 10) {
        self.workbenchInfo.css({
          'transform': `scale(${self.workbenchData.s += .1})`,
        });
      } else if (delta < 0 && self.workbenchData.s > .3) {
        self.workbenchInfo.css({
          'transform': `scale(${self.workbenchData.s -= .1})`,
        });
      }
    });
  }

  /**
   * 事件代理
   */
  onEventProxy () {
    const self = this;
    $('#blive-workbench *').on('click', (event) => {
      self.workbenchSelectorController.top = 0;
      self.workbenchSelectorController.left = 0;
      self.workbenchInfo.top = 0;
      self.workbenchInfo.left = 0;
      self.fluoroscopeShowState = true;
      this.onWithUpdataFluoroscopy(event);
    });

    ///
    $('.blive-workbench').on('click', (event) => {
      if (event.target.className == "blive-workbench") {
        self.fluoroscopeShowState = false;
      }
    });
  }

  /**
   * 更新视图
   * 元素选择器
   */
  onWithUpdataFluoroscopy (event) {
    const self = this;

    console.log(event)

    self.workbenchSelectorController.left += event.target.offsetLeft;
    self.workbenchSelectorController.top += event.target.offsetTop;
    self.workbenchSelectorController.width = event.target.clientWidth;
    self.workbenchSelectorController.height = event.target.clientHeight;
    self.fluoroscopy
        .css({
      'top': `${self.workbenchData.top + self.workbenchSelectorController.top}px`,
      'left': `${self.workbenchData.left + self.workbenchSelectorController.left}px`,
    });
  }


  setWid (item, data, type) {
    const self = this;
    switch (type.toString()) {
      case 'top':
      case 'button':
        return  this._sanitizer.bypassSecurityTrustStyle(item === 't' ? '0px' : data.height + 'px');
        break;
      case 'left':
      case 'right':
        return  this._sanitizer.bypassSecurityTrustStyle(item === 'l' ? '0px' : data.width + 'px');
        break;

      case 'height':
        return  this._sanitizer.bypassSecurityTrustStyle(String(data.height + 'px'));
        break;
      case 'width':
        return  this._sanitizer.bypassSecurityTrustStyle(String(data.width + 'px'));
        break;

      case 'angle-top':
        switch (item.toString()) {
          case 'lt':
          case 'rt':
            return this._sanitizer.bypassSecurityTrustStyle( '-2.5px');
            break;
          case 'lb':
          case 'rb':
            return this._sanitizer.bypassSecurityTrustStyle(data.height - 2.5 + 'px');
            break;
        }
        break;
      case 'angle-left':
        switch (item.toString()) {
          case 'lt':
          case 'lb':
            return this._sanitizer.bypassSecurityTrustStyle( '-1.5px');
            break;
          case 'rt':
          case 'rb':
            return  this._sanitizer.bypassSecurityTrustStyle(data.width - 1.5 + 'px');
            break;
        }
        break;
    }
  }

  /**
   * 编写模块
   */
  onInput () {
    const self = this;

    $('#blive-workbench *').on('dbclick', (event) => {
      $(event).attr('contenteditable','true');
    });
  }
}