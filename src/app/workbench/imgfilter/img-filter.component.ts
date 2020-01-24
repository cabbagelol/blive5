import {Component, EventEmitter, OnInit, Output} from '@angular/core';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench-imgfilter',
  templateUrl: './img-filter.component.html',
  styleUrls: ['./img-filter.component.css']
})

export class ImgFilterComponent implements OnInit {
  @Output('filterChange') filterChange_ = new EventEmitter<any>();
  @Output('filterClose') filterClose_ = new EventEmitter<any>();

  // window
  public window: any = $(window);
  // 窗口属性
  imgFilter: any = {
    'x': 0,
    'y': 0,
  };
  // 滤镜效果列表
  filter: Array<any> = [100,0,0,0,0,0];
  // 复合滤镜选项
  radioValue = 0;
  radioList = [
    {
      id: 0,
      img: '',
      text: '旧照片',
    },
    {
      id: 1,
      img: '',
      text: '模糊',
    },
    {
      id: 2,
      img: '',
      text: '漫画',
    },
  ];

  constructor() { }

  ngOnInit() {
    const self = this;
    const imgFilterEvent = $('.blive-imgFilter-box');

    self.window = $(window);
    self.imgFilter.x = self.window.width() / 2 - 200
    self.imgFilter.y = (self.window.height() / 2) - parseInt(imgFilterEvent.height()) / 2;
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

  /**
   * 条 值
   */
  onInput (index) {
    const self = this;
    // self.filter[index];
    console.log('1')

    self.onChange();
  }

  /**
   * 更变滤镜
   */
  onChange () {
    this.filterChange_.emit({
      filter: this.filter,
    });
  }

  /**
   * 关闭
   */
  onClose () {
    this.filterClose_.emit();
  }
}
