import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

export const LoginRoutes: Routes = [
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes) ],
    exports: [ RouterModule ]
})

export class PublicPagesRoutingModule {}
