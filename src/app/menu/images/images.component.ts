import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "blive-windwos-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.less"]
})
export class ImagesComponent implements OnInit {
  @Output('close') close_ = new EventEmitter<any>();
  @Output('mobanData') mobanData_ = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  /**
   * 关闭
   */
  close(event) {
    if (event == "event" || event.target.className == "blive-images-window") {
      this.close_.emit();
    }
  }
}
