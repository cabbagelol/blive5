import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorage, SeesionStorage} from '../../../public/localStorage';

@Component({
  selector: 'blive-windwos-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  providers: [LocalStorage, SeesionStorage],
})
export class HistoryComponent implements OnInit {
  @Output('close') close_ = new EventEmitter<any>();

  /// 历史数据
  data = [
    {
      name: 'Lily'
    },
    {
      name: 'Lily'
    }
  ];

  // 抽屉状态
  visible = false;

  constructor(private mSeesionStorage: LocalStorage) { }

  ngOnInit() {
    this.mSeesionStorage.setObject('2', {

    });
  }

  /**
   * 抽屉开关函数
   */
  drawerSwitch(): void {
    this.visible = this.visible != true;
  }

  /**
   * 关闭
   */
  close(event) {
    if (event == "event" || event.target.className == "blive-history-window") {
      this.close_.emit();
    }
  }

}
