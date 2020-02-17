import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './workbench/index.component';
import { FolderPage } from './dashboard/folder/folder.component';
import { SourceMaterialComponent } from './menu/sourceMaterial/sourceMaterial.component';

const routes: Routes = [
    { path: '', redirectTo: 'edit/', pathMatch: 'full' },
    { path: 'edit', redirectTo: 'edit/', pathMatch: 'full' },
    { path: 'edit/:uuid', component: IndexComponent },
    { path: 'dashboard/folder', component: FolderPage },
    { path: 'demo', component: SourceMaterialComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}