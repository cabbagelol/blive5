import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'blive-attrbute-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css'],
})
 
export class BackgroundComponent implements OnInit {
  @Input() data: any;

  backgroundImagesList: Array<any> = [
    1, 2
  ];

  // 背景圖片值
  backgroundImageValue: any;

  // 背景颜色值
  backgroundColorValue: any = "#ffffff";

  ngOnInit() {
  }

  // 获取颜色的方法Ï
  changeComplete(event) {
    const self = this;
    var backgroundColorValue = "";
    switch(event.color.source){
      case 'hsva':
        let hsva = event.color.hsl;
        backgroundColorValue = `hsla(${hsva.h}, ${hsva.s.toFixed(2) * 100}%, ${hsva.l.toFixed(2) * 100}%, ${hsva.a})`;
        break;
      case 'rgb':
        let hsv = event.color.rgb;
        backgroundColorValue = `rgba(${hsv.r}, ${hsv.g}, ${hsv.b}, ${hsv.a})`;
        break;
        // backgroundColorValue = event.color.hex;
        // break;
      case 'hsla':
        let hsla = event.color.hsl;
        backgroundColorValue = `hsla(${hsla.h}, ${hsla.s}, ${hsla.l}, ${hsla.a})`;
        break; 
    }
    self.backgroundColorValue = backgroundColorValue;
    self.onBackgroundColorModel(event, backgroundColorValue);
  }


  /**
   * 同步對象到面板中
   */
  onAsyncPanel() {
    const self = this;
    var value = $(self.data.event.target).css('backgroundColor');
    var bgImg = self.data.event.target.style.backgroundImage || '';

    if (value == "" || value == undefined) {
      return;
    }

    // color
    self.backgroundColorValue = value;
    // image
    self.backgroundImageValue = bgImg;
  }

  /**
   * 更新背景圖片屬性
   * Background-Image
   */
  onBackgroundImageModel(e, value) {
    const self = this;

    self.onUpdataBackground('background-image', value);
  }


  /**
   * 更新背景顏色屬性
   * Background-Color
   */
  onBackgroundColorModel(e, value) {
    const self = this;

    self.onUpdataBackground('background-color', value);
  }

  /**
   * 寫入屬性
   */
  onUpdataBackground(name, data) {
    const self = this;

    if (Object.keys(self.data).length <= 0) {
      return;
    }

    if (data == undefined || data == "") {
      return;
    }

    $(self.data.event.target).css({
      [name]: data,
    });
  }
}
