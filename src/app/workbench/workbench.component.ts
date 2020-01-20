import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Shortcutkeys} from './shortcutkeys';
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd";

// @ts-ignore
import $ from "jquery";
import api from 'src/public/api';

@Component({
    selector: 'blive-workbench',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.css'],
    providers: [Shortcutkeys]
})

export class WorkbenchComponent implements OnInit {
    @Input() data: any;
    @Output('checked') checkedBack = new EventEmitter<any>();

    // panel
    private windows;
    // 工作台
    private workbenchInfo;
    // 选择器
    private fluoroscopy;
    // [预选]选择器
    private previewFluoroscopy;
    // [预选]选择器属性
    private workbenchPreviewSelectorController = {
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
    private fluoroscopeShowState = false;
    // 是否可见[预选]选择器
    private fluoroscopePreviewShowState = false;
    // 工作台
    private workbenchData = {
        'isData': false, // 工作台是否包含内容
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

    constructor(private _sanitizer: DomSanitizer,
                private notification: NzNotificationService,
                private shortcutkeys: Shortcutkeys,
                private nzContextMenuService: NzContextMenuService) {
    }

    async ngOnInit() {
        this.windows = $(window);
        this.workbenchInfo = $('#blive-workbench');
        this.fluoroscopy = $('#blive-fluoroscopy > div.d1');
        this.previewFluoroscopy = $('#blive-fluoroscopy > div.d2');

        /**
         * 检查工作台内容
         * 是否存在
         */
        if (this.isWorkbenchData().state) {
            /// 更新工作台
            await this.setWorkbenchReady();
            await this.onEventProxy();
        } else {
            /// 显性工作台引导
        }

        this.onShortcutkeys();
    }

    /**
     * 全局事件
     */
    onShortcutkeys () {
        this.shortcutkeys.readonly();
    }

    /**
     * 设置工作台
     * 准备
     */
    async setWorkbenchReady() {
        const self = this;
        const box = $('.blive-workbench');

        self.workbenchData = Object.assign(self.workbenchData, {
            left: (box.width() / 2) - (api.blankSize[1].width / 2 || self.workbenchInfo.width() / 2),
            top: (box.height() / 2) - (api.blankSize[1].height / 2 || self.workbenchInfo.height() / 2),
            width: api.blankSize[1].width || self.workbenchInfo.width(),
            height: api.blankSize[1].height || self.workbenchInfo.height(),
        });

        self.workbenchInfo.attr(
            "style",
            `left: calc(50% - ${api.blankSize[1].width / 2 || self.workbenchInfo.width() / 2}px); top: calc(50% - ${api.blankSize[1].height / 2 || self.workbenchInfo.height() / 2}px)`
        );

        /**
         * 初始设置的画布大小
         * 具体看api.blankSize配置
         */
        this.setWhiteboardsizeSize(api.blankSize[1]);

        /**
         * 监听窗口变动
         * 及时更新位置
         */
        self.windows.resize(async (event) => {
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
    onWorkController() {
        var self = this;


        $('.blive-workbench').css({
            "cursor": "grabb",
        });

        $('.blive-workbench').mousedown(function (e) {
            var positionDiv = self.workbenchInfo.offset();
            var distenceX = e.pageX - positionDiv.left;
            var distenceY = e.pageY - positionDiv.top;

            $('.blive-workbench').css({
                "cursor": "grabbing",
            });

            $(document).mousemove(e => {
                var borderBottomWidth = 0;
                var x = e.pageX - distenceX;
                var y = e.pageY - distenceY;

                if (e.target.className != "blive-workbench") {
                    return;
                }

                if (self.workbenchSelectorController.event == '{}') {
                    borderBottomWidth = self.workbenchSelectorController.event['target'].style.borderBottomWidth || 0;
                }

                self.workbenchData.top = y;
                self.workbenchData.left = x;

                self.fluoroscopy.css({
                    'top': `${self.workbenchData.top + self.workbenchSelectorController.top + borderBottomWidth}px`,
                    'left': `${self.workbenchData.left + self.workbenchSelectorController.left + borderBottomWidth}px`,
                });

                self.workbenchInfo.css({
                    'left': x + 'px',
                    'top': y + 'px'
                });
            });

            // 释放
            $(document).mouseup(function () {
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
    async onResetPosition() {
        const self = this;
        self.workbenchInfo.top = 0;
        self.workbenchInfo.left = 0;
        self.workbenchSelectorController.top = 0;
        self.workbenchSelectorController.left = 0;
    }

    /**
     * 事件代理
     */
    onEventProxy() {
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
    onWithUpdataPreviewFluoroscopy(event) {
        const self = this;
        const target = event.target;

        self.workbenchPreviewSelectorController.width = event.target.clientWidth;
        self.workbenchPreviewSelectorController.height = event.target.clientHeight;
        self.fluoroscopePreviewShowState = true;
        self.workbenchPreviewSelectorController.nodeName = event.target.nodeName.toLocaleLowerCase().replace(event.target.nodeName.toLocaleLowerCase()[0], event.target.nodeName.toLocaleLowerCase()[0].toLocaleUpperCase());

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
    onWithUpdataFluoroscopy(event) {
        const self = this;
        var borderBottomWidth = 0;
        var target;

        if (self.workbenchSelectorController.event == '{}') {
            borderBottomWidth = self.workbenchSelectorController.event['target'].style.borderBottomWidth || 0;
        }

        if (!event.target) {
            target = {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
            }
        } else {
            target = {
                left: event.target.offsetLeft,
                top: event.target.offsetTop,
                width: event.target.clientWidth,
                height: event.target.clientHeight,
            }
        }

        self.workbenchSelectorController.left = target.left;
        self.workbenchSelectorController.top = target.top;
        self.workbenchSelectorController.width = target.width;
        self.workbenchSelectorController.height = target.height;

        /**
         * 影响top因素:
         * 容器距离 + 外边距离 +
         */
        self.fluoroscopy
            .css({
                'top': `${self.workbenchData.top + self.workbenchSelectorController.top + borderBottomWidth}px`,
                'left': `${self.workbenchData.left + self.workbenchSelectorController.left + borderBottomWidth}px`,
            });
    }

    setWid(item, data, type: string) {
        const self = this;
        const num = 3;
        switch (type.toString()) {
            case 'top':
            case 'button':
                return this._sanitizer.bypassSecurityTrustStyle(item === 't' ? '0px' : data.height + 'px');
                break;
            case 'left':
            case 'right':
                return this._sanitizer.bypassSecurityTrustStyle(item === 'l' ? '0px' : data.width + 'px');
                break;

            case 'height':
                return this._sanitizer.bypassSecurityTrustStyle(String(data.height + 'px'));
                break;
            case 'width':
                return this._sanitizer.bypassSecurityTrustStyle(String(data.width + 'px'));
                break;

            case 'angle-top':
                switch (item.toString()) {
                    case 'lt':
                    case 'rt':
                        return this._sanitizer.bypassSecurityTrustStyle(`-${num}px`);
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
                        return this._sanitizer.bypassSecurityTrustStyle(`-${num}px`);
                        break;
                    case 'rt':
                    case 'rb':
                        return this._sanitizer.bypassSecurityTrustStyle(data.width - num + 'px');
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
        if (target == undefined) {
            return
        }
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
                return self._sanitizer.bypassSecurityTrustStyle(`${target.style.paddingRight}`)
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
    onInput() {
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

    /**
     * 设置画布大小
     * 由staffgauge内提供
     */
    async setWhiteboardsizeSize(data: any) {
        const self = this;
        self.workbenchInfo.css({
            'width': `${data.width}px`,
            'height': `${data.height}px`
        });

        /**
         * 延迟更新
         * 否则获取的是动画执行中属性
         * 动画时间为250ms
         */
        setTimeout(_ => {
            self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);
        }, 250)
    }

    /**
     * 更新工作台内简介数据
     */
    async onUpdataWorkbenchMoban() {
        const self = this;
        await $.ajax(`../../assets/moban/${self.data.moban.name}.txt`).then(res => {
            self.workbenchInfo.html(res);
            self.data.editorCode = res;
        }).catch(err => {
            self.notification.warning(
                '模板丢失',
                '哭唧唧,很遗憾的告诉你简介姬找不到这简介，要不你联系下作者吧'
            );
        });
        await this.isWorkbenchData();
        await this.setWorkbenchReady();
        await this.onEventProxy();
    }

    /**
     * 代码视图变动
     * 代码变动需要重新获取树节 重新绑定事件代理
     */
    async onWindowSizeChange(event: any) {
        const self = this;
        self.workbenchInfo.codeHeigth = event.y;

        await self.setWorkbenchReady();
        await self.onResetPosition();
        await self.onEventProxy();
        await self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);
    }

    /**
     * 工作台视图高度获取
     */
    getWindowSizeChange() {
        const self = this;
        return self._sanitizer.bypassSecurityTrustStyle(`${self.workbenchInfo.codeHeigth}px`);
    }

    /**
     * 检查工作台是否存在简介
     */
    isWorkbenchData() {
        const self = this;
        const data = self.workbenchInfo.html();

        if (data.toString().length > 0) {
            self.workbenchData.isData = true;
            return {
                'length': data.toString().length,
                'state': true,
            }
        } else {
            self.workbenchData.isData = false;
            return {
                'state': false,
            }
        }
    }

    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }

    closeMenu(): void {
        this.nzContextMenuService.close();
    }
}