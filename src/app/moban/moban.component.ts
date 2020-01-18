import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import moban from '../../public/moban';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions} from "ng-zorro-antd";

@Component({
    selector: 'blive-moban-window',
    templateUrl: './moban.component.html',
    styleUrls: ['./moban.component.css']
})
export class MobanComponent implements OnInit, AfterViewInit {
    @Output('close') close_ = new EventEmitter<any>();
    @Output('mobanData') mobanData_ = new EventEmitter<any>();

    @ViewChild('nzTreeComponent', {static: false}) nzTreeComponent: NzTreeComponent;

    defaultCheckedKeys = ['10020'];
    defaultSelectedKeys = ['10010'];
    defaultExpandedKeys = ['100', '1001'];

    // 模板列表
    mobanlist: any;

    nodes: NzTreeNodeOptions[] = [
        {
            title: 'parent 1',
            key: '100',
            children: [
                {
                    title: 'parent 1-0',
                    key: '1001',
                    disabled: true,
                    children: [
                        {title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true},
                        {title: 'leaf 1-0-1', key: '10011', isLeaf: true}
                    ]
                },
                {
                    title: 'parent 1-1',
                    key: '1002',
                    children: [
                        {title: 'leaf 1-1-0', key: '10020', isLeaf: true},
                        {title: 'leaf 1-1-1', key: '10021', isLeaf: true}
                    ]
                }
            ]
        }
    ];

    constructor() {
    }

    ngOnInit() {
        this.mobanlist = moban.getMobanList();
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
        this.close('event');
        this.mobanData_.emit(data);
    }

    nzClick(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    nzCheck(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    // nzSelectedKeys change
    nzSelect(keys: string[]): void {
        console.log(keys, this.nzTreeComponent.getSelectedNodeList());
    }

    ngAfterViewInit(): void {
        // get node by key: '10011'
        console.log(this.nzTreeComponent.getTreeNodeByKey('10011'));
        // use tree methods
        console.log(
            this.nzTreeComponent.getTreeNodes(),
            this.nzTreeComponent.getCheckedNodeList(),
            this.nzTreeComponent.getSelectedNodeList(),
            this.nzTreeComponent.getExpandedNodeList()
        );
    }
}
