import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Pipe,
  PipeTransform
} from "@angular/core";
import Html2canvas from "html2canvas";
import { DomSanitizer } from "@angular/platform-browser";
import Util from "../../../public/util";
@Component({
  selector: "blive-menu-sourceMaterial-sourceMaterial",
  templateUrl: "./sourceMaterial.component.html",
  styleUrls: ["./sourceMaterial.component.css"]
})

@Pipe({
  name: 'html'
})
export class SourceMaterialComponent implements OnInit {
  // 是否可见
  domPopupShow: boolean = false;

  // 数据
  // data 原数据
  // ldata显示数据，允许操控
  domString: any = {
    data: [
      {
        id: Util.getUUID(16),
        html: `
        <span id='d1' style="font-size: 24px;font-weight: bold; margin-top: 0px;">点击添加标题文字</span>      
              `
      },
      {
        id: Util.getUUID(16),
        html: "<p id='d2'>文檔文段</p>"
      },
      {
        id: Util.getUUID(16),
        html: '<p id="d3">W3商品信息栏位<br><span style="color:red;">商品信息介绍</span></p>'
      }
    ],
    ldata: [], 
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const self = this;
    self.domString.data.forEach(elementString => {
      self.domString.ldata.push(
        self.sanitizer.bypassSecurityTrustHtml(elementString.html)
      );

    });
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log(ev);
    ev.dataTransfer.setData("Text", ev.target.id);
  }
 
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    console.log(data);
    // ev.target.appendChild(document.getElementById(data));
  }
}
