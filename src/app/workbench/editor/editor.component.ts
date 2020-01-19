import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

// @ts-ignore
import $ from "jquery";
import {DomSanitizer} from "@angular/platform-browser";
import {LocalStorage, SeesionStorage} from "../../../public/localStorage";

@Component({
  selector: 'blive-code-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [LocalStorage, SeesionStorage],
})

export class EditorComponent implements OnInit,OnChanges  {
  @Output('change') change_ = new EventEmitter<any>();
  @Input() code: string = '';

  // window
  public window: any = $(window);
  // 编译器参数
  editorOptions = {
    language: 'html',
  };
  // 编译器各种状态
  editor: any = {
    'height': 0,
    'y': 0,
    'startY': 0,
    'endY': 0,
    'startOneState': false
  };

  constructor(private _sanitizer: DomSanitizer,private mSeesionStorage: LocalStorage) { }

  ngOnInit() {
    const self = this;
    let calaNum = parseInt(this.window.height()) / 3;
    let configure = self.mSeesionStorage.getObject('blive_configure');

    /**
     * 初始编译器
     * 判断开关是否启动编译器
     */
    if (Object.keys(configure).length > 0) {
      if (configure.codeview.switch) {
        self.editor.height = calaNum;
      } else {
        self.editor.height = 0;
        self.onChange({
          'y': parseInt(this.window.height()),
        });
      }
    } else {
      self.editor.height = 0;
      self.onChange({
        'y': parseInt(this.window.height()),
      });
    }
  }

  ngOnChanges(changes:{[code:string]: SimpleChange }) {
    console.log(changes)
  }

  /**
   * 拖拽
   * 鼠标按下
   */
  onEditorLineMouseDow (event) {
    const self = this;
    self.window.on('mousemove', event => {
      let calaNum = parseInt(this.window.height()) - event.pageY;
      console.log(calaNum)
      if (calaNum > (this.window.height() / 3) * 2 || calaNum < (this.window.height() / 4) * 1) {
        return;
      }
      self.editor.height = calaNum;
      self.onChange({
        'y': parseInt(this.window.height()) - self.editor.height,
      });
    })
    self.window.on('mouseup', _ => {
      self.window.off('mousemove');
    })
  }

  /**
   * 获取比例高度
   */
  getIdeHeight () {
    const self = this;
    return self.editor.height + 'px';
  }

  /**
   * 更新代码到工作台上
   * @param event
   */
  onInput (event) {
    $('#blive-workbench').html(event);
  }

  /**
   * 更新数据对象到父容器
   * 工作台 《= 编译器
   */
  onChange (data) {
    const self = this;
    self.change_.emit(Object.assign({
      // do
    }, data));
  }
}
