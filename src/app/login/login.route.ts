import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

export const LoginRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        component: LoginComponent,
        path: 'login'
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
