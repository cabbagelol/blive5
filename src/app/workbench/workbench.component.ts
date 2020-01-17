import { Component, OnInit, Output, EventEmitter,Input  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})

export class WorkbenchComponent implements OnInit {
  @Input() data: any;
  @Output('checked') checkedBack = new EventEmitter<any>();

  // windows
  windows = $('window, document');
  // 工作台
  workbenchInfo;
  // 选择器
  fluoroscopy;
  // [预选]选择器
  previewFluoroscopy;
  // [预选]选择器属性
  workbenchPreviewSelectorController = {
    'nodeName': '',
    'width': 0,
    'height': 0,
    'margin': {
      'top': 0,
      'left': 0,
      'botton': 0,
      'right': 0,
    }
  };
  // 是否可见选择器
  fluoroscopeShowState = false;
  // 是否可见[预选]选择器
  fluoroscopePreviewShowState = false;
  // 工作台
  workbenchData = {
	  's': 1,
	  'top': 0,
	  'left': 0,
      'width': 0,
    'height': 0,
  };
  // 选择器坐标位置
  private workbenchSelectorController = {
    'top': 0,
    'left': 0,
    'width': 0,
    'height': 0,
    'event': {},
  };

  constructor(private _sanitizer: DomSanitizer) {}

  async ngOnInit() {
	this.workbenchInfo = $('#blive-workbench');
    this.fluoroscopy = $('#blive-fluoroscopy > div.d1');
    this.previewFluoroscopy = $('#blive-fluoroscopy > div.d2')
    await this.setWorkbenchReady();
    await this.onEventProxy();
  }

  async setWorkbenchReady () {
    const self = this;
    const box = $('.blive-workbench');

    self.workbenchData = Object.assign(self.workbenchData, {
      left: (box.width() / 2) - (self.workbenchInfo.width() / 2),
      top: (box.height() / 2) -  (self.workbenchInfo.height() / 2),
      width: self.workbenchInfo.width(),
      height: self.workbenchInfo.height(),
    });

    self.workbenchInfo.attr(
        "style",
        `left: calc(50% - ${self.workbenchInfo.width() / 2}px); top: calc(50% - ${self.workbenchInfo.height() / 2}px)`
    );

    /**
     * 监听窗口变动
     * 及时更新位置
     */
    self.windows.resize(async  (event) => {
      await self.setWorkbenchReady();
      await self.onResetPosition();
      await self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);
    });

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
            const target = self.workbenchSelectorController.event['target'];
            var x = e.pageX - distenceX;
            var y = e.pageY - distenceY;

            if (e.target.className != "blive-workbench") {
              return;
            }

            self.workbenchData.top = y;
            self.workbenchData.left = x;

            self.fluoroscopy.css({
              'top': `${self.workbenchData.top + self.workbenchSelectorController.top + parseInt(target.style.borderBottomWidth || 0)}px`,
              'left': `${self.workbenchData.left + self.workbenchSelectorController.left + parseInt(target.style.borderBottomWidth || 0)}px`,
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
      const delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
          // chrome & ie
          (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
      if (delta > 0 && self.workbenchData.s < 1.4) {
        self.workbenchInfo.css({
          'transform': `scale(${self.workbenchData.s += .1})`,
        });
      } else if (delta < 0 && self.workbenchData.s > 1) {
        self.workbenchInfo.css({
          'transform': `scale(${self.workbenchData.s -= .1})`,
        });
      }
    });
  }

  /**
   * 重置选择器坐标
   */
  async onResetPosition () {
    const self = this;
    self.workbenchInfo.top = 0;
    self.workbenchInfo.left = 0;
    self.workbenchSelectorController.top = 0;
    self.workbenchSelectorController.left = 0;
  }

  /**
   * 事件代理
   */
  onEventProxy () {
    const self = this;
    self.workbenchInfo.find('*').on('click', (event) => {
      self.workbenchSelectorController.event = event;
      self.fluoroscopePreviewShowState = false;
      self.fluoroscopeShowState = true;
      self.onResetPosition();
      self.onChangeComponentData(event);
      self.onWithUpdataFluoroscopy(event);
      return false;
    }).mouseover(event => {
      /**
       * 判断预选选择器不能与选择器同选
       */
      if (self.workbenchSelectorController.event['target'] == event.target) {
        self.fluoroscopePreviewShowState = false;
        return;
      }
      self.onWithUpdataPreviewFluoroscopy(event);
    });

    $('.blive-workbench').mouseover(event => {
      if (event.target.className == "blive-workbench") {
        self.fluoroscopePreviewShowState = false;
      }
    });
  }

  /**
   * 预览视图
   */
  onWithUpdataPreviewFluoroscopy (event) {
    const self = this;
    const target = event.target;

    self.workbenchPreviewSelectorController.width = event.target.clientWidth;
    self.workbenchPreviewSelectorController.height = event.target.clientHeight;
    self.fluoroscopePreviewShowState = true;
    self.workbenchPreviewSelectorController.nodeName = event.target.nodeName.toLocaleLowerCase().replace(event.target.nodeName.toLocaleLowerCase()[0],event.target.nodeName.toLocaleLowerCase()[0].toLocaleUpperCase());

    self.previewFluoroscopy
        .css({
          'top': `${self.workbenchData.top + target.offsetTop + parseInt(target.style.borderBottomWidth || 0)}px`,
          'left': `${self.workbenchData.left + target.offsetLeft + parseInt(target.style.borderBottomWidth || 0)}px`,
        });
  }

  /**
   * 更新视图
   * 元素选择器
   */
  onWithUpdataFluoroscopy (event) {
    const self = this;
    const target = self.workbenchSelectorController.event['target'];

    self.workbenchSelectorController.left = event.target.offsetLeft;
    self.workbenchSelectorController.top = event.target.offsetTop;
    self.workbenchSelectorController.width = event.target.clientWidth;
    self.workbenchSelectorController.height = event.target.clientHeight;

    /**
     * 影响top因素:
     * 容器距离 + 外边距离 +
     */
    self.fluoroscopy
        .css({
      'top': `${self.workbenchData.top + self.workbenchSelectorController.top + parseInt(target.style.borderBottomWidth || 0)}px`,
      'left': `${self.workbenchData.left + self.workbenchSelectorController.left + parseInt(target.style.borderBottomWidth || 0)}px`,
    });
  }

  setWid (item, data, type: string) {
    const self = this;
    const num = 3;
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
            return this._sanitizer.bypassSecurityTrustStyle( `-${num}px`);
            break;
          case 'lb':
          case 'rb':
            return this._sanitizer.bypassSecurityTrustStyle(data.height - num + 'px');
            break;
        }
        break;
      case 'angle-left':
        switch (item.toString()) {
          case 'lt':
          case 'lb':
            return this._sanitizer.bypassSecurityTrustStyle( `-${num}px`);
            break;
          case 'rt':
          case 'rb':
            return  this._sanitizer.bypassSecurityTrustStyle(data.width - num + 'px');
            break;
        }
        break;
    }
  }

  /**
   * 距离识别区
   * 选择器外距离 内距离
   */
  getDistanceRecognitionArea(type: string) {
    const self = this;
    const target = self.workbenchSelectorController.event['target'];
    if (target == undefined) {return}
    switch (type.toString()) {
      case '+top':
      case '-top':
        return self._sanitizer.bypassSecurityTrustStyle(`${type == '-top' ? '-' : ''}${target.style.marginTop}`)
        break;
      case '+left':
      case '-left':
        return self._sanitizer.bypassSecurityTrustStyle(`${type == '-left' ? '-' : ''}${target.style.marginLeft}`)
        break;
      case '+bottom':
      case '-bottom':
        return self._sanitizer.bypassSecurityTrustStyle(`${type == '-bottom' ? '-' : ''}${target.style.marginBottom}`)
        break;
      case '+right':
      case '-right':
        return self._sanitizer.bypassSecurityTrustStyle(`${type == '-right' ? '-' : ''}${target.style.marginRight}`)
        break;
      case 'p-top':
        return self._sanitizer.bypassSecurityTrustStyle(`${target.style.paddingTop}`)
        break;
      case 'p-left':
        return self._sanitizer.bypassSecurityTrustStyle(`${target.style.paddingLeft}`)
        break;
      case 'p-width-right':
        return `${self.workbenchSelectorController.width - parseInt(target.style.paddingRight)}px`
        break;
      case 'p-right':
        return  self._sanitizer.bypassSecurityTrustStyle(`${target.style.paddingRight}`)
        break;
      case 'p-height-bottom':
        return `${self.workbenchSelectorController.height - parseInt(target.style.paddingBottom)}px`
        break;
      case 'p-bottom':
        return self._sanitizer.bypassSecurityTrustStyle(`${target.style.paddingBottom}`)
        break;
    }
  }

  /**
   * 数值更新
   * 该方法向父容器传递该控件选择器内元素属性
   */
  public onChangeComponentData(event: object) {
    const self = this;
    self.checkedBack.emit({
      'event': event,
      "workbench": self.workbenchData
    });
  }

  /**
   * 编写模块
   * 焦点 失焦
   */
  onInput () {
    const self = this;
    self.workbenchInfo.find('*').on('dblclick', (event) => {
      $(event)[0].target.contentEditable = true;
      $($(event)[0].target).focus();

      $($(event)[0].target).on('keypress', (event) => {
        console.log('键盘')
        self.onResetPosition();
        self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);
      });

      $($(event)[0].target).blur(event_ => {
        $($(event_)[0].target).removeAttr("contenteditable");
      })
      return false;
    });
  }
}