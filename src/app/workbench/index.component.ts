import { Component, OnInit, ViewChild } from "@angular/core";
import { WorkbenchComponent } from "./workbench.component";
import { Location } from "@angular/common";
import util from "../../public/util";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  /// 接收工作台数据
  data: any = {};

  // @ts-ignore
  @ViewChild("workbench")
  workbench: WorkbenchComponent;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    const self = this;
    const map = util.getQueryVariable();
    const uuid = this.route.snapshot.paramMap.get("uuid");

    if (uuid == '') {
      self.location.go("edit/" + util.getUUID(16));
    }
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
      moban: moban
    });
    this.workbench.onUpdataWorkbenchMoban();
  }
}
