import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    data: any = {};

    ngOnInit() {
    }

    ngOnChanges() {
    }

    checkedBack (event: any) {
        this.data = event;
        console.log('event', event)
    }
}


