import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzMessageService} from 'ng-zorro-antd/message';

import util from '../../../public/util';
import {LocalStorage, SeesionStorage} from '../../../public/localStorage';
import {Historicalstorage} from "../../workbench/historicalstorage";
import {Data} from "@angular/router";

@Component({
    selector: 'blive-windwos-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    providers: [LocalStorage, SeesionStorage, Historicalstorage],
})

export class HistoryComponent implements OnInit {
    @Output('close') close_ = new EventEmitter<any>();

    /// 历史数据
    historyList: any = [];
    listLength: number = 0;
    private saveName: string = 'blive.historicalstorage';
    isAllDisplayDataChecked = false;
    isIndeterminate = false;
    listOfDisplayData: Data[] = [];
    mapOfCheckedId: { [key: string]: boolean } = {};
    numberOfChecked = 0;

    constructor(
        private sanitizer: DomSanitizer,
        private message: NzMessageService,
    ) {
    }

    ngOnInit() {
        const self = this;
        var historicalstorage = LocalStorage.getObject(self.saveName);

        self.listLength = Historicalstorage.onQueryListLength();

        if (Object.keys(historicalstorage).length > 0) {
            historicalstorage.list.forEach(i => {
                i.html = this.sanitizer.bypassSecurityTrustHtml(i.html);
                i.time = new Date(i.time);
            });
            self.historyList = historicalstorage.list;
        }
    }

    /**
     * 关闭
     */
    close(event) {
        if (event == "event" || event.target.className == "blive-history-window") {
            this.close_.emit();
        }
    }

    /**
     * 打开新简介
     */
    open(data) {
        const queryUrl = util.getQueryVariable();
        if (Object.keys(queryUrl).length > 0) {
            if (data.id == queryUrl.id) {
                this.message.info('当前正在编辑的简介就是它呀 Σ(っ °Д °;)っ');
                return;
            }
            window.location.href = `/?id=${data.id}`
        }
    }

    /**
     * 删除简介
     */
    delete(data) {
        const self = this;
        Historicalstorage.delete(data.id).then(result => {
            if (result) {
                self.message.success('删除成功');

                self.ngOnInit();
            }
        });
    }

    /**
     * 编辑时更新标题
     * @param $event
     */
    onUpDataList (data: any) {
        const self = this;
        var list = LocalStorage.getObject(self.saveName);

        list.list.forEach(i => {
            if (data.id == i.id) {
                i.name = data.name;
            }
        })

        LocalStorage.setObject(self.saveName, list);
    }

    currentPageDataChange($event: Data[]): void {
        this.listOfDisplayData = $event;
        this.refreshStatus();
    }

    refreshStatus(): void {
        this.isAllDisplayDataChecked = this.listOfDisplayData
            .filter(item => !item.disabled)
            .every(item => this.mapOfCheckedId[item.id]);
        this.isIndeterminate =
            this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
            !this.isAllDisplayDataChecked;
        this.numberOfChecked = this.historyList.filter(item => this.mapOfCheckedId[item.id]).length;
    }

    checkAll(value: boolean): void {
        this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
        this.refreshStatus();
    }
}
