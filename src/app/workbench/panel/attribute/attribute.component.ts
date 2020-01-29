import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {DomSanitizer} from "@angular/platform-browser";
import {SizeComponent} from "./size/size.component";

@Component({
    selector: 'blive-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AttributeComponent implements OnInit {
    @Input() data: any;
    @Output('eventSelectorControl') eventSelectorControl_ = new EventEmitter<any>();
    @Output('attrChange') attrChange_ = new EventEmitter<any>();
    @ViewChild('sizecomponent', {static: false}) sizecomponent_: SizeComponent;

    public config: PerfectScrollbarConfigInterface = {};

    panels = [
        {
            active: false,
            disabled: false,
            name: 'Padding',
            customStyle: {
                'background': '#fff',
                'border-bottom': '1px  solid #f9f9f9'
            },
        },
        {
            active: false,
            disabled: false,
            name: 'Text',
            customStyle: {
                'background': '#fff',
                'border-bottom': '1px  solid #f9f9f9'
            },
        }
    ];
    // 模板节点列表
    mobanDoms: any;

    constructor(
        private _sanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {
    }

    onUpDom() {
        const self = this;
        self.getDoms(document.getElementById('Blive'));
    }

    getDoms(event) {
        const self = this;
        var getDOM = (function () {
            var dom = "";
            var depth = 0;

            const a = '<svg data-icon="SelectorCombo" aria-hidden="true" focusable="false" width="10" height="17" viewBox="0 0 10 17" class="bem-Svg" style="display: block; transform: translate(0px, 0px); opacity: 0.6; justify-self: end; margin-top: -2px;"><path fill="currentColor" d="M9 11H6V8H4v3H1v2h3v3h2v-3h3z"></path><path fill="currentColor" d="M4 1h2v4H4z" opacity=".3"></path></svg>';

            return function (node, n) {
                dom += `<div class="flex">`;
                for (var i = 0; i < depth; i++) {
                    dom += `<div class="domList-span">${i >= depth - 1 ? a : ''}</div>`;
                }
                dom += '<b class="flex-nodeName">' + node.nodeName.toLowerCase() + '</b>';
                if (node.id) {
                    dom += '<kbd>' + '[#' + node.id + ']' + '</kbd>';
                }
                if (node.className) {
                    dom += '(' + node.className + ')'
                }
                if (typeof n === 'number') {
                    dom += '<span>{child #' + n + '}</span>';
                }
                dom += '</div>';
                depth++;
                [].forEach.call(node.children, function (node, childNumber) {
                    getDOM(node, childNumber);
                });
                depth--;
                if (depth == 0) {
                    const domHtml = dom;
                    dom = "";
                    return domHtml;
                }
            };
        })();

        // @ts-ignore
        self.mobanDoms = this._sanitizer.bypassSecurityTrustHtml(getDOM(event));
    }

    /**
     * onEventSelectorControl -> F
     */
    onEventSelectorControl(name) {
        this.eventSelectorControl_.emit(name);
    }

    /**
     * 主动更新attr属性
     * 同步style同步到面板下的子组件数据
     */
    onUpAttrData() {
        this.sizecomponent_.setAttrUp();
    }

    /**
     * 通知选择器更新
     */
    onNoticeFather () {
        this.attrChange_.emit();
    }
}
