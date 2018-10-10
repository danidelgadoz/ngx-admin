import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const LoginRoutes: Routes = [
    {
        path: '',
        redirectTo: 'authentication',
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
                resolve: [ LoginGuard ]
            },
            {
                path: 'register',
                component: RegisterComponent,
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes) ],
    exports: [ RouterModule ],
    providers: [ LoginGuard ]
})

export class AuthenticationRoutingModule {}
