import { Component, OnInit } from '@angular/core';
import {LocalStorage, SeesionStorage} from "../../../public/localStorage";
import {Historicalstorage} from "../../workbench/historicalstorage";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [LocalStorage, SeesionStorage, Historicalstorage],
})
export class FolderPage implements OnInit {
  private saveName: string = 'blive.historicalstorage';
  // 数据列表
  folderList: Array<any> = [];

  constructor(
      private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    const self = this;
    var historicalstorage = LocalStorage.getObject(self.saveName);

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
      self.folderList = historicalstorage.list;
    }
  }

}
