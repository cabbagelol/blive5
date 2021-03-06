import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ColorChromeModule } from 'ngx-color/chrome'; // <color-chrome></color-chrome>
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { httpInterceptorProviders } from '../public/http';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

// S 公共组件
// import { ComponentPublic } from '../component/index.component';
// E 公共组件

import { WorkbenchComponent } from './workbench/workbench.component';
import { StaffgaugeComponent } from './workbench/staffgauge/staffgauge.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MobanComponent } from './moban/moban.component';
import { FoundationPanelComponent } from './workbench/panel/foundation-panel/foundation-panel.component';
import { EditorComponent } from './workbench/editor/editor.component';
import { ConfigureComponent } from './menu/configure/configure.component';
import { ConfigureCodeviewComponent } from './menu/configure/configure-codeview/configure-codeview.component';
import { AboutComponent } from './menu/configure/about/about.component';
import { AccountComponent } from './menu/configure/account/account.component';
import { WorkbenchstyleComponent } from './menu/configure/workbenchstyle/workbenchstyle.component';
import { ProfileinformationComponent } from './menu/configure/profileinformation/profileinformation.component';
import { ShortcutkeysComponent } from './menu/configure/shortcutkeys/shortcutkeys.component';
import { HistoryComponent } from './menu/history/history.component';
import { ImagesComponent } from './menu/images/images.component';
import { ImgFilterComponent } from './workbench/imgfilter/img-filter.component';
import { AttributeComponent } from './workbench/panel/attribute/attribute.component';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

import {
  PerfectScrollbarModule, PerfectScrollbarConfigInterface,
  PERFECT_SCROLLBAR_CONFIG
} from 'ngx-perfect-scrollbar';

import { ImgAttrComponent } from './workbench/imgattr/img-attr.component';
import { AttrbutespacingComponent } from './workbench/panel/attribute/attrbutespacing/attrbutespacing.component';
import { FolderPage } from './dashboard/folder/folder.component';
import { IndexComponent } from './workbench/index.component';
import { UtmsourceComponent } from './dashboard/utmsource/utmsource.component';
import { SizeComponent } from './workbench/panel/attribute/size/size.component';
import { BackgroundComponent } from './workbench/panel/attribute/background/background.component';
import { BackgroundTypeComponent } from './workbench/panel/attribute/background/background-type/background-type.component';
import { TypographyComponent } from './workbench/panel/attribute/typography/typography.component';
import { CustomAttributesComponent } from './workbench/panel/attribute/customAttributes/customAttributes.component';
import { AttributeGridComponent } from '../component/attributeGrid/attributeGrid.component';
import { SourceMaterialComponent } from './menu/sourceMaterial/sourceMaterial.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ColorChromeModule,
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

    PerfectScrollbarModule,
    
    StoreModule.forRoot({ count: counterReducer })
  ],
  declarations: [
    // 公共控件
    AttributeGridComponent,

    // 基础
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
    ConfigureComponent,
    ConfigureCodeviewComponent,
    AboutComponent,
    AccountComponent,
    WorkbenchstyleComponent,
    ProfileinformationComponent,
    ShortcutkeysComponent,
    HistoryComponent,
    ImagesComponent,
    ImgFilterComponent,
    AttributeComponent,
    ImgAttrComponent,
    AttrbutespacingComponent,
    FolderPage,
    IndexComponent,
    UtmsourceComponent,
    SizeComponent,
    BackgroundComponent,
    BackgroundTypeComponent,
    TypographyComponent,
    CustomAttributesComponent,
    SourceMaterialComponent,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
