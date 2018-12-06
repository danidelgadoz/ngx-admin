import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Logged } from './core/guards/logged.guard';

import { NotFoundComponent } from './core/layouts/not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule',
        resolve: [ Logged ]
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [ AuthGuard ]
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
        AuthGuard,
        Logged
    ]
})
export class AppRoutingModule {}
