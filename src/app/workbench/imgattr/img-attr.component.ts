import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// @ts-ignore
import $ from "jquery";
import {NzMessageService, UploadChangeParam} from "ng-zorro-antd";
import api from '../../../public/api';


@Component({
  selector: 'blive-workbench-imgattr',
  templateUrl: './img-attr.component.html',
  styleUrls: ['./img-attr.component.less']
})
export class ImgAttrComponent implements OnInit {
  @Input() data: any;
  @Output('imgAttrChange') imgAttrChange_ = new EventEmitter<any>();
  @Output('imgAttrClose') imgAttrClose_ = new EventEmitter<any>();

  // window
  public window: any = $(window);
  // 图片列表
  imagesApiList: any = {
    list: [],
    value: ''
  };
  // 图片属性
  imgAttr: any  = {
    src: '',
    src_: '',
    alt: '描述内容',
    title: '',
    width: 0,
    height: 0,
    size: 0,
    x: 0,
    y: 0,
  };
  //
  isVisible = false;

  constructor(
      private msg: NzMessageService
  ) { }

  ngOnInit() {
    const self = this;
    const imgFilterEvent = $('.blive-imgAttr-box');

    self.imagesApiList = {
      list: api.imgagesApi,
      value: api.imgagesApi[0].url
    };

    self.window = $(window);
    self.imgAttr.x = self.window.width() / 2 - 200
    self.imgAttr.y = (self.window.height() / 2) - parseInt(imgFilterEvent.height()) / 2;
    self.imgAttr.src = self.data.workbenchSelectorController.target.currentSrc;
    self.imgAttr.width = self.data.workbenchSelectorController.target.naturalWidth;
    self.imgAttr.height = self.data.workbenchSelectorController.target.naturalHeight;
    self.imgAttr.size = performance.getEntriesByName(self.data.workbenchSelectorController.target.currentSrc)[0]['encodedBodySize'] || 0;
    self.imgAttr.alt = self.data.workbenchSelectorController.target.alt;
    self.imgAttr.title = self.data.workbenchSelectorController.target.title;
  }

  /**
   * 更变图片属性
   */
  onChange () {
    const self = this;
    self.onClose();
    self.imgAttrChange_.emit(self.imgAttr);
  }

  /**
   * 关闭
   */
  onClose () {
    this.imgAttrClose_.emit();
  }

  showModal(type: number = 0): void {
    const self = this;
    switch (type) {
      case 0:
        // 抛弃上传
        break;
      case 1:
        // 确认使用该图片
        self.imgAttr.src = self.imgAttr.src_;
        break;
    }
    this.isVisible = this.isVisible != true;
  }

  /**
   * 上传图片
   * @param file
   * @param fileList
   */
  onUploadImg(Filedata): void {
    const self = this;
    var fd = new FormData();
        fd.append('file', 'multipart');
        fd.append('Filedata', Filedata);

    $.ajax({
      url: self.imagesApiList.value,
      method: 'post',
      processData: false,
      contentType: false,
      cache: false,
      data: fd,
    }).then(res => {
      if (res.code == 1) {
        self.imgAttr.src_ = res.imgurl;
      }
    });
  }

  /**
   * 数据类型转换
   * TODO 放util类中
   * @param dataurl
   */
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  /**
   * 获取文件并处理
   * @param event
   */
  previewFile(event) {
    const self = this;
    var reader = new FileReader();
    var files = event.target.files;
    if(files.length > 0){
      reader.readAsDataURL(files[0]);
      reader.onloadend = function ()
      {
        let bol = self.dataURLtoBlob(reader.result);
                  self.onUploadImg(bol);
      }
    }
  }

  /**
   * 选择图片
   */
  onSelectImagesChange (event) {
    console.log(event);
  }
}

