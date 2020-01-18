import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { httpInterceptorProviders } from '../public/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppComponent }         from './app.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';

import { WorkbenchComponent }   from './workbench/workbench.component';
import { StaffgaugeComponent } from './workbench/staffgauge/staffgauge.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MobanComponent } from './moban/moban.component';
import { FoundationPanelComponent } from './workbench/panel/foundation-panel/foundation-panel.component';
import { EditorComponent } from './workbench/editor/editor.component';
import { ConfigureComponent } from './menu/configure/configure.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MonacoEditorModule.forRoot(), // use forRoot() in main app module only.

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    // ui
    NgZorroAntdModule,
    NzIconModule,
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    WorkbenchComponent,
    StaffgaugeComponent,
    MenuComponent,
    FooterComponent,
    MobanComponent,
    FoundationPanelComponent,
    EditorComponent,
    ConfigureComponent
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
