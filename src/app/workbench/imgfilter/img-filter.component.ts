import { Component, OnInit } from '@angular/core';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench-imgfilter',
  templateUrl: './img-filter.component.html',
  styleUrls: ['./img-filter.component.css']
})

export class ImgFilterComponent implements OnInit {
  // window
  public window: any = $(window);
  imgFilter: any = {
    'x': 0,
    'y': 0,
  };
  radioValue = 0;
  radioList = [
    {
      id: 0,
      img: '',
      text: '1',
    },
    {
      id: 1,
      img: '',
      text: '1',
    },
    {
      id: 2,
      img: '',
      text: '1',
    },
    {
      id: 3,
      img: '',
      text: '1',
    },
  ];

  constructor() { }

  ngOnInit() {
    const self = this;
    const imgFilterEvent = $('.blive-imgFilter');

    self.window = $(window);
    self.imgFilter.x = self.window.width() / 2 - 200
    self.imgFilter.y = (self.window.height() / 2) - (parseInt(imgFilterEvent.height()) * 4);
    console.log(self.imgFilter.y )
  }

  /**
   * 拖拽
   * 鼠标按下
   */
  onEditorLineMouseDow (event) {
    const self = this;
    const imgFilterEvent = $('.blive-imgFilter');

    imgFilterEvent.on('mousemove', event => {
      self.imgFilter.x = event.pageX;
      self.imgFilter.y = event.pageY;

      console.log(event)
    }).on('mouseup', _ => {
      console.log("放开")
      imgFilterEvent.off('mousemove');
    })
  }
}
