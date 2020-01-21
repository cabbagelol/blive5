import {Component, OnInit, OnChanges, ViewChild} from '@angular/core';
import {WorkbenchComponent} from "./workbench/workbench.component";
import {Location} from "@angular/common";
import util from '../public/util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnChanges {

    /// 接收工作台数据
    data: any = {};

    // @ts-ignore
    @ViewChild('workbench')
    workbench: WorkbenchComponent;

    constructor(
        private location: Location,
    ) {}

    ngOnInit() {
        const self = this;
        const map = util.getQueryVariable();
        if (Object.keys(map).length == 0) {
            self.location.go('/?id=' + util.getUUID(16) + '&one=true')
        }
    }

    ngOnChanges () {

    }

    /**
     * 简介比例
     * 通知工作台比例更改
     * @param event
     */
    checkedBack(event: any) {
        this.data = Object.assign(this.data, event);
    }

    /**
     * 通知工作台模板选择
     * 模板库中选取模板后通过该函数更新data对象，让工作台获取到选择简介模板
     */
    setMobanToggle(moban: any) {
        this.data = Object.assign(this.data, {
            'moban': moban
        });
        this.workbench.onUpdataWorkbenchMoban();
    }
}


