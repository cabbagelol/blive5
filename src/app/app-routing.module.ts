import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {IndexComponent} from './workbench/index.component';
import {FolderPage} from './dashboard/folder/folder.component';

const routes: Routes = [
    { path: '', redirectTo: 'edit', pathMatch: 'full' },
    {path: 'edit', component: IndexComponent},
    {path: 'dashboard/folder', component: FolderPage}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}