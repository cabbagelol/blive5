import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NzMessageService} from 'ng-zorro-antd/message';

import util from '../../../public/util';
import zip from '../../../public/zip';

import {LocalStorage, SeesionStorage} from '../../../public/localStorage';
import {Historicalstorage} from "../../workbench/historicalstorage";

@Component({
    selector: 'blive-windwos-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.less'],
    providers: [LocalStorage, SeesionStorage, Historicalstorage],
})

export class HistoryComponent implements OnInit {
    @Output('close') close_ = new EventEmitter<any>();

    /// 历史数据
    historyList: any = [];
    listLength: number = 0;
    private saveName: string = 'blive.historicalstorage';

    constructor(
        private sanitizer: DomSanitizer,
        private message: NzMessageService,
        private _historicalstorage: Historicalstorage
    ) {
    }

    ngOnInit() {
        const self = this;
        var historicalstorage = LocalStorage.getObject(self.saveName);

        self.listLength = Historicalstorage.onQueryListLength();

        if (Object.keys(historicalstorage).length > 0) {
            historicalstorage.list.forEach((i, index) => {
                i.key = index;
                i.html = this.sanitizer.bypassSecurityTrustHtml(i.html);
                i.time = new Date(i.time);
                i.show = false;
                if (!i.children) {
                    i.children = []
                } else {
                    i.children.forEach(f => {
                        f.time = new Date(f.time);
                    })
                }
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
     * 打包简介
     * 导出
     */
    async onPackZip (data)  {
        const self = this;
        var res = await self._historicalstorage.query(data.id);
        zip.pack(`${data.id}.${data.name || '未命名简介'}.blive`,[{
            'filename': 'data/html.txt',
            'filecontent': res.html
        },
        {
            'filename': 'package.json',
            'filecontent': `
{
    "name": "${res.name}", 
    "id": "${res.id}",
    "creation-user": "none",
    "creation-time": ${res.time},
    "update-time": ${res.time},
    "blive": {
        "version": "5"
    },
    "data": {
        "name": "none",
        "version": "none"
    }
}
            `
        },
        {
            'filename': '说明.txt',
            'filecontent': `
## 描述
#  这是一份Blive所生成的文档，该文档存放由用户编辑保存各项简
#  介数据，Blive程序副本文件，作为永久性存档。
#
#  用户保存的存档(当前压缩包)可单独解压取"~/data/html.txt"
#  查看简介实际内容(Blive不建议直接使用该份代码粘贴到直播室)
#  因为往往还未经过Blive实际编译，必然出现简介排版问题，具体
#  阅读Blive帮助中心内“编译周期”。

## 导入
#  打开Blive找到“导入”功能，直接导入该压缩包即可。
            `
        }]);
    }

    /**
     * 删除简介
     */
    delete(data: any, type: number = -1) {
        const self = this;

        Historicalstorage.delete(data.id, type.toString()).then(result => {
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
    onUpDataList(data: any) {
        const self = this;
        var list = LocalStorage.getObject(self.saveName);

        list.list.forEach(i => {
            if (data.id == i.id) {
                i.name = data.name;
            }
        })

        LocalStorage.setObject(self.saveName, list);
    }

    /**
     * 展开状态
     */
    onCollapse (data) {
        data.show = data.show != true;
    }
}
