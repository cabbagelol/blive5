import { Component, OnInit } from '@angular/core';
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'blive-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})

export class WorkbenchComponent implements OnInit {
  workbenchInfo;
  workbenchData = {
	  's': 0,
	  'x': 0,
	  'y': 0,
  };

  async ngOnInit() {
	this.workbenchInfo = $($('#blive-workbench')[0]);
	 
    await this.setWorkbenchReady();
    await this.onEventProxy();
  }

  async setWorkbenchReady () {
    const w = this.workbenchInfo.width();
    const h = this.workbenchInfo.height();


    // transform: translateX(${h / 2}px) translateY(${w / 2}px)
    this.workbenchInfo.attr(
        "style",
        `width: calc(100% - ${h}px); left: ${h / 2}px; top: ${w / 2}px`
    );
	
	this.onWorkController();
  }

  /**
   * 工作台控制
   * 滑动 放大
   */
  onWorkController () {
	  var self = this;
	  
    $('.blive-workbench').mousedown(function(e){
          var positionDiv = self.workbenchInfo.offset();
          var distenceX = e.pageX - positionDiv.left;
          var distenceY = e.pageY - positionDiv.top;
		  
          $(document).mousemove(function(e){
            var x = e.pageX - distenceX;
            var y = e.pageY - distenceY;

            if(x<0){
              x=0;
            }else if(x>$(document).width()-$('#a1').outerWidth(true)){
              x = $(document).width()-$('#a1').outerWidth(true);
            }
            if(y<0){
              y=0;
            }else if(y>$(document).height()-$('#a1').outerHeight(true)){
              y = $(document).height()-$('#a1').outerHeight(true);
            } 

            self.workbenchInfo.css({
              'left':x+'px',
              'top':y+'px'
            });
        });

        // 释放
        $(document).mouseup(function(){
          $(document).off('mousemove');
        });
    }).on('mousewheel',(e, d) => {
		console.log(e.detail, d); 
		    
	});
  }


  /**
   * 事件代理
   */
  onEventProxy () {
    $('#blive-workbench *').on('click', e => {
      console.log(e);
    });
  }

  /**
   * 更新视图
   * 元素选择器
   */
  onWithUpdataFluoroscopy () {
    const fluoroscopy = $('#blive-fluoroscopy');

  }
}