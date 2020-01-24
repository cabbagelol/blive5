import {Component, OnInit} from '@angular/core';
import { PerfectScrollbarConfigInterface,
    PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
    selector: 'blive-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.css']
})

export class AttributeComponent implements OnInit {
    public config: PerfectScrollbarConfigInterface = {};

    panels = [
        {
            active: false,
            disabled: false,
            name: 'adding',
            customStyle: {
                background: '#f7f7f7',
            },
        },
        {
            active: false,
            disabled: false,
            name: 'text',
            customStyle: {
                background: '#f7f7f7',
            },
        }
    ];

    constructor() {}

    ngOnInit(): void {

    }
}
