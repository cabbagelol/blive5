import { Component, OnInit } from '@angular/core';
import {LocalStorage, SeesionStorage} from '../../../../public/localStorage';

@Component({
  selector: 'blive-configure-codeview',
  templateUrl: './configure-codeview.component.html',
  styleUrls: ['./configure-codeview.component.css'],
  providers: [LocalStorage, SeesionStorage],

})
export class ConfigureCodeviewComponent implements OnInit {
  editorOptions = {
    language: 'html',
    theme: "vs-light",
    themes: [{
      theme: 'vs-light',
    }, {
      theme: 'vs-dark',
    }],
    code: `
<!-- 注释内容 -->
<div style="color: red">
    <p>文本内容</p>
    <a href="" target="_blank">链接</a>
</div>    
    `
  };
  // 开关状态
  switchValue: boolean = false;
  // 配置名称
  storageName: string = 'blive_configure';

  constructor(private mLocalStorage: LocalStorage) { }

  ngOnInit() {
    const self = this;
    var codeviewState = self.mLocalStorage.getObject(self.storageName);

    /**
     * 当首次配置时
     * 代码视图为设置为不可用 走1
     * 如果存在则走2
     */
    if (Object.keys(codeviewState).length == 0) {
      // 1
      self.mLocalStorage.setObject(self.storageName, Object.assign(self.mLocalStorage.getObject(self.storageName), {
        'codeview': {
          'switch': false,
        }
      }));
    } else {
      // 2
      self.switchValue = codeviewState.codeview.switch;
    }
  }

  /**
   * 代码视图开关
   */
  onClickSwitch () {
    const self = this;

    self.switchValue = self.switchValue != true;
    self.mLocalStorage.setObject(self.storageName, Object.assign(self.mLocalStorage.getObject(self.storageName), {
      'codeview': {
        'switch': self.switchValue
      }
    }));
  }
}
