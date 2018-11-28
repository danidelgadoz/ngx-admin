import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { LoginGuard } from './authentication/login.guard';

import { NotFoundComponent } from './public-pages/not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule',
        resolve: [ LoginGuard ]
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [ DashboardGuard ]
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ],
    providers: [
        DashboardGuard,
        LoginGuard
    ]
})
export class AppRoutingModule {}
