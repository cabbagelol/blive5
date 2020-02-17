import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { DomSanitizer } from "@angular/platform-browser";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { increment, decrement, reset, setData } from "../../../counter.actions";

import { SizeComponent } from "./size/size.component";
import { BackgroundComponent } from "./background/background.component";
import { TypographyComponent } from "./typography/typography.component";
import { CustomAttributesComponent } from "./customAttributes/customAttributes.component";
import { AttributeGridComponent } from "../../../../component/attributeGrid/attributeGrid.component";

import api from "src/public/api";

@Component({
  selector: "blive-attribute",
  templateUrl: "./attribute.component.html",
  styleUrls: ["./attribute.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class AttributeComponent implements OnInit {
  @Input() data: any;
  @Output("eventSelectorControl") eventSelectorControl_ = new EventEmitter<
    any
  >();
  @Output("attrChange") attrChange_ = new EventEmitter<any>();
  @ViewChild("sizecomponent", { static: false }) sizecomponent_: SizeComponent;
  @ViewChild("backgroundcomponent", { static: false })
  backgroundcomponent_: BackgroundComponent;
  @ViewChild("typographyComponent", { static: false })
  typographyComponent_: TypographyComponent;
  @ViewChild("attributeCustomAttributes", { static: false })
  attributeCustomAttributes_: CustomAttributesComponent;
  @ViewChild("attributeGridComponent", { static: false })
  attributeGridComponent_: AttributeGridComponent;

  public config: PerfectScrollbarConfigInterface = {};

  count$: Observable<number>;

  // 面板tab
  attrTabs = "0";

  /// 面板儲存屬性
  panelData = {
    eventOneStatc: false,
    attrs: [],
    calc: 0,
    lock: true
  };

  panels = {
    active: false,
    disabled: false,
    name: "Padding",
    customStyle: {
      background: "#fff5f9",
      color: "#fff5f9",
      "border-bottom": "1px solid rgba(255, 134, 178, 0.05)"
    }
  };

  // 模板节点列表
  mobanDoms: any;

  constructor(
    private _sanitizer: DomSanitizer,
    private store: Store<{ count: number }>
  ) {
    this.count$ = store.pipe(select("count"));
  }

  ngOnInit(): void {}

  onUpDom() {
    // const self = this;
    // self.getDoms(document.getElementById("Blive"));
  }

  getDoms(event) {
    const self = this;
    var getDOM = (function() {
      var dom = "";
      var depth = 0;

      const a =
        '<svg data-icon="SelectorCombo" aria-hidden="true" focusable="false" width="10" height="17" viewBox="0 0 10 17" class="bem-Svg" style="display: block; transform: translate(0px, 0px); opacity: 0.6; justify-self: end; margin-top: -2px;"><path fill="currentColor" d="M9 11H6V8H4v3H1v2h3v3h2v-3h3z"></path><path fill="currentColor" d="M4 1h2v4H4z" opacity=".3"></path></svg>';

      return function(node, n) {
        dom += `<div class="flex">`;
        for (var i = 0; i < depth; i++) {
          dom += `<div class="domList-span">${i >= depth - 1 ? a : ""}</div>`;
        }
        dom +=
          '<b class="flex-nodeName">' + node.nodeName.toLowerCase() + "</b>";
        if (node.id) {
          dom += "<kbd>" + "[#" + node.id + "]" + "</kbd>";
        }
        if (node.className) {
          dom += "(" + node.className + ")";
        }
        if (typeof n === "number") {
          dom += "<span>{child #" + n + "}</span>";
        }
        dom += "</div>";
        depth++;
        [].forEach.call(node.children, function(node, childNumber) {
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
    const self = this;
    const tabindex = self.attrTabs;

    /// 當前標籤可用面板屬性
    self.panelData.attrs =
      api.elementWhiteList[self.data.event.target.nodeName.toLowerCase()]
        .attr || [];
    self.panelData.calc = 0;

    switch (tabindex.toString()) {
      case "0":
        setTimeout(_ => {
          self.panelData.attrs.forEach(name => {
            if (name == "size") {
              self.sizecomponent_.setAttrUp();
              self.panelData.calc++;
            }
            if ((name = "background")) {
              self.backgroundcomponent_.onAsyncPanel();
              self.panelData.calc++;
            }
            if ((name = "typography")) {
              self.typographyComponent_.getAttrUp();
              self.panelData.calc++;
            }
          });
        }, 300);
        break;
      case "1":
        self.attributeCustomAttributes_.onUpAttr();
        break;
      case "2":
        self.attributeGridComponent_.onClick();
        break;
    }

    self.panelData.eventOneStatc = true;
  }

  /**
   * 面板類型切換
   */
  onAttributeTabs($event) {
    const self = this;

    self.onUpAttrData();
  }

  /**
   * 通知选择器更新
   */
  onNoticeFather() {
    this.attrChange_.emit();
  }

  /**
   * 更改标签锁定状态
   */
  onNodeLock() {
    const self = this;
    self.panelData.lock = self.panelData.lock != true;

    if (self.panelData.lock) {
        $(self.data.event.target).attr('data-blive-lock', 'true');
    } else {
        $(self.data.event.target).removeAttr('data-blive-lock');
    }

    self.onNoticeFather();
  }

  increment() {
    this.store.dispatch(increment());
  }
 
  decrement() {
    this.store.dispatch(decrement());
  }
 
  reset() {
    this.store.dispatch(reset());
  }
}
