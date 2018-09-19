import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';

export const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        resolve: [LoginGuard]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes) ],
    exports: [ RouterModule ]
})

export class LoginRoutingModule {}
