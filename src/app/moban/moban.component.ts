import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from "ng-zorro-antd";
import moban from '../../public/moban';
// @ts-ignore
import $ from "jquery";

@Component({
    selector: 'blive-moban-window',
    templateUrl: './moban.component.html',
    styleUrls: ['./moban.component.less']
})
export class MobanComponent implements OnInit, AfterViewInit {
    @Output('close') close_ = new EventEmitter<any>();
    @Output('mobanData') mobanData_ = new EventEmitter<any>();
    @ViewChild('nzTreeComponent', {static: false}) nzTreeComponent: NzTreeComponent;

    // 模板列表
    mobanlist: any;
    // 筛选选择keys
    defaultCheckedKeys = [];
    // 筛选归类
    nodes: NzTreeNodeOptions[] = [];

    constructor() {}

    ngOnInit() {
        const self = this;
        let tagList: Array<string> = [];
        self.mobanlist = moban.getMobanList();
        self.mobanlist.forEach(i => {
           i.list.forEach(t => {

               // 标签列表查询
               t.tag.forEach(tagitem => {
                   tagList.push(tagitem);
               });
           });
        });
        Array.from(new Set(tagList)).forEach(i => {
            self.nodes.push({
                title: i,
                key: i,
                isLeaf: true,
            });
        });
    }

    /**
     * 关闭
     */
    close(event) {
        if (event == "event" || event.target.className == "blive-moban-window") {
            this.close_.emit();
        }
    }

    /**
     * 选择模板
     */
    onSelectTemplate(data) {
        if (data.disables) {
            return;
        }
        this.close('event');
        this.mobanData_.emit(data);
    }

    /**
     * 筛选勾选列表
     * @param event
     */
    nzCheck(event: NzFormatEmitEvent): void {
        this.defaultCheckedKeys = event.keys;
    }

    ngAfterViewInit(): void {
        console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
        console.log(
            this.nzTreeComponent.getTreeNodes(),
            this.nzTreeComponent.getCheckedNodeList(),
            this.nzTreeComponent.getSelectedNodeList(),
            this.nzTreeComponent.getExpandedNodeList()
        );
    }

    /**
     * 获取直播间数据
     */
    onGetBilibiliData () {
        const self = this;
        self.onSelectTemplate({
            'w': true,
        })
    }
}
