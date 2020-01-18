import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';

// @ts-ignore
import $ from "jquery";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'blive-code-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})

export class EditorComponent implements OnInit,OnChanges  {
  @Output('change') change_ = new EventEmitter<any>();

  editorOptions = {
    language: 'html',
  };
  @Input() code: string = '';

  public workbench: any = $('.blive-workbench');

  public window: any = $(window);

  // 编译器各种状态
  editor: any = {
    'height': 0,
    'y': 0,
    'startY': 0,
    'endY': 0,
    'startOneState': false
  };

  constructor(private _sanitizer: DomSanitizer,) { }

  ngOnInit() {
    const self = this;
    let calaNum = parseInt(this.window.height()) / 3;
    self.editor.height = calaNum;
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
      self.change_.emit({
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
}
