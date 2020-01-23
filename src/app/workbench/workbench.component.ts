import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzContextMenuService, NzDropdownMenuComponent, NzModalService} from "ng-zorro-antd";
import {Shortcutkeys} from './shortcutkeys';
import {Historicalstorage} from './historicalstorage';
import {NzMessageService} from 'ng-zorro-antd/message';

// @ts-ignore
import $ from "jquery";
import api from 'src/public/api';
import util from "../../public/util";

@Component({
    selector: 'blive-workbench',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.css'],
    providers: [Shortcutkeys, Historicalstorage],
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
        'isNull': false, // 是否无效数据
        'isData': false, // 工作台是否包含内容
        's': 1,
        'top': 0,
        'left': 0,
        'width': 0,
        'height': 0,
    };
    // 选择器坐标位置
    private workbenchSelectorController = {
        'nodeName': '',
        'top': 0,
        'left': 0,
        'width': 0,
        'height': 0,
        'borderTopWidth': 0,
        'borderLeftWidth': 0,
        'borderBottomWidth': 0,
        'borderRightWidth': 0,
        'marginTop': 0,
        'marginLeft': 0,
        'marginBottom': 0,
        'marginRight': 0,
        'paddingTop': 0,
        'paddingLeft': 0,
        'paddingBottom': 0,
        'paddingRight': 0,
        'event': {},
    };
    // 属性可见面板
    panel: any = {
        imgFilter: false,
    }

    constructor(private _sanitizer: DomSanitizer,
                private notification: NzNotificationService,
                private shortcutkeys: Shortcutkeys,
                private _historicalstorage: Historicalstorage,
                private message: NzMessageService,
                private modalService: NzModalService,
                private nzContextMenuService: NzContextMenuService) {
    }

    async ngOnInit() {
        const self = this;

        this.windows = $(window);
        this.workbenchInfo = $('#blive-workbench');
        this.fluoroscopy = $('#blive-fluoroscopy > div.d1');
        this.previewFluoroscopy = $('#blive-fluoroscopy > div.d2');

        /**
         * 从路由获取id取得简介数据
         * 取历史纪录， 如果没有则是失效id
         */
        const UrlVariable = util.getQueryVariable();
        if (Object.keys(UrlVariable).length > 0) {
            var res = self._historicalstorage.query(UrlVariable.id);
            if (!!res) {
                self.workbenchInfo.html(res.html);
                self.data.editorCode = res.html;
                self.workbenchData.isData = true;
                self.workbenchData.isNull = false;
            } else {
                self.workbenchData.isNull = !UrlVariable.one;
                self.workbenchData.isData = true;
            }
        } else {
            self.workbenchData.isData = false;
            self.workbenchData.isNull = true;
        }

        await self.isWorkbenchData()
        await self.setWorkbenchReady();
        await self.onEventProxy();
        await self.onShortcutkeys();
    }

    /**
     * 全局事件
     */
    async onShortcutkeys() {
        const self = this;
        const map = util.getQueryVariable();

        self.shortcutkeys.readonly({
            resolve: (keys) => {

                switch (keys.codekey) {
                    case 0:
                        if (!this.isWorkbenchData().state) {
                            this.modalService.error({
                                nzTitle: '糟糕',
                                nzContent: '要不试试先创建一份模板试试.....'
                            });
                            return
                        }

                        this.message
                            .loading('储存中', {nzDuration: 2500}).onClose!
                            .subscribe(() => {
                                this.message.success('成功', {nzDuration: 2500});
                                self._historicalstorage.save(map.id, self.workbenchInfo.html());
                            });
                        break;
                    case 10:
                        // .on("mousewheel DOMMouseScroll", function (e) {
                        //     const delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||
                        //         // chrome & ie
                        //         (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
                        //     if (delta > 0 && self.workbenchData.s < 1.4) {
                        //         self.workbenchInfo.css({
                        //             'transform': `scale(${self.workbenchData.s += .1})`,
                        //         });
                        //     } else if (delta < 0 && self.workbenchData.s > 1) {
                        //         self.workbenchInfo.css({
                        //             'transform': `scale(${self.workbenchData.s -= .1})`,
                        //         });
                        //     }
                        // });
                        break;
                }
            }
        });
    }

    /**
     * 设置工作台
     * 准备
     */
    async setWorkbenchReady() {
        const self = this;
        const box = $('.blive-workbench');

        self.workbenchData = Object.assign(self.workbenchData, {
            left: (box.width() / 2) - (api.blankSize[2].width / 2 || self.workbenchInfo.width() / 2),
            top: (box.height() / 2) - (api.blankSize[2].height / 2 || self.workbenchInfo.height() / 2),
            width: api.blankSize[1].width || self.workbenchInfo.width(),
            height: api.blankSize[1].height || self.workbenchInfo.height(),
        });

        self.workbenchInfo.attr(
            "style",
            `left: calc(50% - ${api.blankSize[2].width / 2 || self.workbenchInfo.width() / 2}px); top: calc(50% - ${api.blankSize[2].height / 2 || self.workbenchInfo.height() / 2}px)`
        );

        document.querySelectorAll('a').forEach(a => {
            a.onclick = (e) => {
                e.preventDefault()
            }
        })

        /**
         * 初始设置的画布大小
         * 具体看api.blankSize配置
         */
        this.setWhiteboardsizeSize(api.blankSize[2]);

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
        $('.blive-workbench').mousedown(function (e) {
            const positionDiv = self.workbenchInfo.offset();
            const distenceX = e.pageX - positionDiv.left;
            const distenceY = e.pageY - positionDiv.top;

            $('.blive-workbench').css({
                "cursor": "grabbing",
            });

            $(document).mousemove(e => {
                var x = e.pageX - distenceX;
                var y = e.pageY - distenceY;

                if (e.target.className != "blive-workbench") {
                    return;
                }

                self.workbenchData.top = y;
                self.workbenchData.left = x;
                self.fluoroscopePreviewShowState = false;

                self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);

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
        }).css({
            "cursor": "grabb",
        });
    }

    /**
     * 重置选择器坐标
     */
    onResetPosition(): any {
        const self = this;
        self.workbenchInfo.top = 0;
        self.workbenchInfo.left = 0;
        // self.workbenchInfo.width = 0;
        // self.workbenchInfo.height = 0;
        self.workbenchSelectorController.top = 0;
        self.workbenchSelectorController.left = 0;
        // self.workbenchSelectorController.width = 0;
        // self.workbenchSelectorController.height = 0;
        self.workbenchSelectorController.borderBottomWidth = 0;
        self.workbenchSelectorController.borderLeftWidth = 0;
        self.workbenchSelectorController.borderRightWidth = 0;
        self.workbenchSelectorController.borderTopWidth = 0;
        self.workbenchSelectorController.marginLeft = 0;
        self.workbenchSelectorController.marginTop = 0;
        self.workbenchSelectorController.marginBottom = 0;
        self.workbenchSelectorController.marginRight = 0;
    }

    /**
     * 事件代理
     */
    onEventProxy() {
        const self = this;
        self.workbenchInfo.find('*').on('click', (event) => {
            // 主动消除编辑点
            self.workbenchInfo.find('*').removeAttr("contenteditable");

            // 选择器
            self.workbenchSelectorController.event = event;
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
            self.fluoroscopePreviewShowState = true;
            self.onWithUpdataPreviewFluoroscopy(event);
        });

        // $('.blive-workbench').mouseover(event => {
        //     if (event.target.className == "blive-workbench") {
        //         self.fluoroscopePreviewShowState = false;
        //     }
        // });
    }

    /**
     * 预览视图
     */
    onWithUpdataPreviewFluoroscopy(event) {
        const self = this;
        const target = event.target;
        var x = 0;
        var y = 0;

        self.workbenchPreviewSelectorController.width = target.clientWidth;
        self.workbenchPreviewSelectorController.height = target.clientHeight;
        self.workbenchPreviewSelectorController.nodeName = event.target.nodeName.toLocaleLowerCase().replace(event.target.nodeName.toLocaleLowerCase()[0], event.target.nodeName.toLocaleLowerCase()[0].toLocaleUpperCase());

        switch (target.nodeName) {
            case 'IMG':
                y = target.y;
                x = target.x;
                break;
            case 'DIV':
            case 'P':
            default:
                y = self.workbenchData.top + target.offsetTop + (parseInt(target.style.borderTopWidth) || 0)
                x = self.workbenchData.left + target.offsetLeft + (parseInt(target.style.borderLeftWidth) || 0)
        }

        self.previewFluoroscopy.css({
            'top': `${y}px`,
            'left': `${x}px`
        });
    }

    /**
     * 更新视图
     * 元素选择器
     */
    onWithUpdataFluoroscopy(event) {
        const self = this;
        let x = 0;
        let y = 0;
        var target;

        if (!event.target) {
            target = {
                nodeName: '',
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderBottomWidth: 0,
                borderRightWidth: 0,
                marginLeft: 0,
                marginTop: 0,
                marginBottom: 0,
                marginRight: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingBottom: 0,
                paddingRight: 0,
            }
        } else {
            target = {
                nodeName: event.target.nodeName,
                left: event.target.offsetLeft,
                top: event.target.offsetTop,
                width: event.target.clientWidth,
                height: event.target.clientHeight,
                borderTopWidth: parseInt(event.target.style.borderTopWidth) || 0,
                borderLeftWidth: parseInt(event.target.style.borderLeftWidth) || 0,
                borderBottomWidth: parseInt(event.target.style.borderBottomWidth) || 0,
                borderRightWidth: parseInt(event.target.style.borderRightWidth) || 0,
                marginLeft: parseInt(event.target.style.marginLeft),
                marginTop: parseInt(event.target.style.marginTop),
                marginBottom: parseInt(event.target.style.marginBottom),
                marginRight: parseInt(event.target.style.marginRight),
                paddingTop: parseInt(event.target.style.paddingTop),
                paddingLeft: parseInt(event.target.style.paddingLeft),
                paddingBottom: parseInt(event.target.style.paddingBottom),
                paddingRight: parseInt(event.target.style.paddingRight),
            }
        }

        self.workbenchSelectorController = Object.assign(self.workbenchSelectorController, {
            nodeName: target.nodeName,
            left: target.left,
            top: target.top,
            width: target.width,
            height: target.height,
            borderTopWidth: target.borderTopWidth,
            borderLeftWidth: target.borderLeftWidth,
            borderBottomWidth: target.borderBottomWidth,
            borderRightWidth: target.borderRightWidth,
            marginLeft: target.marginLeft,
            marginTop: target.marginTop,
            marginBottom: target.marginBottom,
            marginRight: target.marginRight,
            paddingTop: target.paddingTop,
            paddingLeft: target.paddingLeft,
            paddingBottom: target.paddingBottom,
            paddingRight: target.paddingRight,
        })


        if (!!event.target) {
            /**
             * 处理不同标签坐标
             */
            switch (event.target.nodeName) {
                case 'IMG':
                    y = event.target.y;
                    x = event.target.x;
                    break;
                case 'P':
                    y = self.workbenchData.top + self.workbenchSelectorController.top
                    x = self.workbenchData.left + self.workbenchSelectorController.left
                    break;
                case 'DIV':
                default:
                    // 容器距离 + 边框宽度距离
                    y = self.workbenchData.top + self.workbenchSelectorController.top + self.workbenchSelectorController.borderTopWidth
                    x = self.workbenchData.left + self.workbenchSelectorController.left + self.workbenchSelectorController.borderLeftWidth
                    break;
            }

            self.fluoroscopy.css({
                'top': `${y}px`,
                'left': `${x}px`,
            });
        }
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
                        return `-${num}px`;
                        break;
                    case 'lb':
                    case 'rb':
                        return `${data.height - num}px`;
                        break;
                }
                break;
            case 'angle-left':
                switch (item.toString()) {
                    case 'lt':
                    case 'lb':
                        return `-${num}px`;
                        break;
                    case 'rt':
                    case 'rb':
                        return `${data.width - num}px`;
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
     * 编写模块 编辑
     * 焦点 失焦
     */
    onInput() {
        const self = this;
        self.workbenchInfo.find('p').on('dblclick', (event) => {
            event.preventDefault();
            event.target.contentEditable = true;
            $(event.target).focus();

            /**
             * 选择编辑并全选文字
             */
            var range = document.createRange();
                range.selectNodeContents($(event)[0].target);
                document.getSelection().removeAllRanges();
                document.getSelection().addRange(range);

            $(event.target).keydown((event) => {
                self.onResetPosition();
                self.onWithUpdataFluoroscopy(self.workbenchSelectorController.event);
            });

            $(event.target).blur(event_ => {
                $($(event_)[0].target).removeAttr("contenteditable");

                /**
                 * 取消全选节点
                 */
                window.getSelection().removeAllRanges();

                return false;
            });

            document.execCommand('', false, null)
            return false;
        }).mouseup(function(event){
            // TODO
        });
    }


    /**
     * 设置画布大小
     * 由staffgauge内提供
     */
    async setWhiteboardsizeSize(data: any) {
        const self = this;

        if (data.company == 'auto') {
            self.workbenchInfo.css({
                'width': ``,
                'height': ``
            });
        } else {
            self.workbenchInfo.css({
                'width': `${data.width}${data.company || 'px'}`,
                'height': `${data.height}${data.company || 'px'}`
            });

        }

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
        if (!self.data.moban.w) {
            await $.ajax(`assets/moban/${self.data.moban.name}.txt`).then(res => {
                self.workbenchInfo.html(res);
                self.data.editorCode = res;
            }).catch(err => {
                self.notification.warning(
                    '模板丢失',
                    '哭唧唧,很遗憾的告诉你简介姬找不到这简介，要不你联系下作者吧'
                );
            });
        } else {
            var roomid = prompt("输入直播间ID:", "");
            if (roomid != null && roomid.length > 0) {
                await $.ajax({
                    type: "post",
                    url: "https://cabbagelol.net/blive/Blive-4.0/aip/get_info.php",
                    dataType: 'json',
                    async: true,
                    data: {
                        roomid: roomid
                    },
                }).then(res => {
                    if (res.message == "ok") {
                        var res = res.data;
                        self.workbenchInfo.html(res.description);
                        self.data.editorCode = res.description;
                    }
                });
            }
        }

        await self.isWorkbenchData();
        await self.setWorkbenchReady();
        await self.onEventProxy();
    }

    /**
     * 代码视图变动
     * 代码变动需要重新获取树节 重新绑定事件代理
     */
    async onWindowSizeChange(event: any) {
        const self = this;
        self.workbenchInfo.codeHeigth = event.y || self.workbenchInfo.codeHeigth;

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

    /**
     * 打开可见面包
     */
    openPanel (name: string) {
        const self = this;
        self.panel[name] = self.panel[name] != true;
    }
}