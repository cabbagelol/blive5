import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// @ts-ignore
import $ from "jquery";
import api from 'src/public/api';
import {window} from "rxjs/operators";

@Component({
    selector: 'blive-staffgauge',
    templateUrl: './staffgauge.component.html',
    styleUrls: ['./staffgauge.component.less']
})
export class StaffgaugeComponent implements OnInit {
    @Input() data: any;
    @Output('whiteboardsizeSize') whiteboardsizesize = new EventEmitter<any>();

    whiteboardsizeList: any = api.blankSize;

    radioValue = api.blankSize[2].name;

    radioCustomValue: any = [1000, 147];

    ngOnInit() {
        this.onReadyStaffgauge();
    }

    Ruler: any = { // 标尺
        width: {x: 0, y: 0}, // x,y
        Mouse: {x: 0, y: 0}, // x/y值
        Guides: {value: [], index: false}, // 参考线
        Top: {t: 0, w: 0, v: 0, v_: new Array(0)}, // 上标尺
        Auto: {t: 0, w: 0, v: 0, v_: new Array(0)}, // 左/右标尺
    };

    length9_ = new Array(9);
    Mouse = {x: 0, y: 0}; // 鼠标位置
    $_Ruler_Guides_: any;

    /**
     * 初始标尺
     */
    onReadyStaffgauge() {
        // 预定义 this_
        const this_ = this;
        // 初始化标尺
        this.__initialization();
        // 监听鼠标位置
        document.onmousemove = e => {
            this_.Mouse = {x: e.clientX, y: e.clientY}; // 赋值鼠标位
            // 鼠标位
            let is = true;
            const Mouse = {x: e.clientX - 95, y: e.clientY - 25};
            for (let k in Mouse) if (Mouse[k] < 0) is = false;
            this_.Ruler.Mouse = is ? Mouse : false;
        };
    }

    __initialization() {
        const self = this;
        const window_ = $(window);

        // 获取
        let [w, h] = [window_.width(), window_.height()];
        // 修正
        [w, h] = [w + 50 - w % 50, h + 50 - h % 50];
        // 赋值
        [
            self.Ruler.Top.w, self.Ruler.Auto.w,
            self.Ruler.Top.t, self.Ruler.Auto.t,
            self.Ruler.Top.v, self.Ruler.Auto.v,
            self.Ruler.Top.v_, self.Ruler.Auto.v_,
        ] = [
            w * 3, h * 3,
            w - 201, h - 201,
            w / 50 * 3, h / 50 * 3,
            new Array(w / 50 * 3), new Array(h / 50 * 3),
        ];
    }

    _Ruler_Guides_(is_level) { // 添加参考线
        this.Ruler.Guides.value.push({ // 添加一个参考线
            standard: is_level, // 是否水平（true/false）
            distance: 0, // 距离
        });
        this._Ruler_Guides_dolly(this.Ruler.Guides.value.length - 1);
    }

    _Ruler_Guides_dolly(key) { // 参考线 ~ 移动
        console.log(this.Ruler.Guides.value[key]);
        const this_ = this; // 预定义
        if (key === false) {
            const is_Guides = this_.Ruler.Guides.index;
            if (is_Guides !== false) { // 参考线添加/移动共享方法
                clearInterval(this_.$_Ruler_Guides_); // 取消执行
                const Guides = this_.Ruler.Guides.value[is_Guides];
                if (Guides.distance <= 95 && !Guides.standard || Guides.distance <= 25) {
                    this_.Ruler.Guides.value.splice(is_Guides, 1);
                }
                this_.Ruler.Guides.index = false; // 取消定位
            }
        } else {
            if (this_.$_Ruler_Guides_ >= 0) clearInterval(this_.$_Ruler_Guides_); // 有bug，如果存在修正
            this_.Ruler.Guides.index = key; // 定位索引
            this_.$_Ruler_Guides_ = setInterval(function () {
                const is = this_.Ruler.Guides.value[key].standard;
                this_.Ruler.Guides.value[key].distance = is ? this_.Mouse.y : this_.Mouse.x;
            }, 100); // 1ms执行速度
        }
    }

    /**
     * 选择比例
     * @param item
     */
    public setWhiteboardsizeSize(item: any) {
        const self = this;
        if (item == -1) {
            self.whiteboardsizesize.emit({
                name: '自定义',
                width: self.radioCustomValue[0],
                height: self.radioCustomValue[1],
                company: 'px',
            });
        } else {
            api.blankSize.forEach(i => {
                if (i.name == self.radioValue) {
                    self.whiteboardsizesize.emit(i);
                }
            })
        }
    }
}