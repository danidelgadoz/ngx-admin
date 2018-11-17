import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuard } from './dashboard.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PaymentResumeComponent } from './payment/payment-resume/payment-resume.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';

export const DashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ DashboardGuard ],
        children: [
            { path: '', redirectTo: 'payment/resume', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'payment/list',  component: PaymentListComponent },
            { path: 'payment/resume',  component: PaymentResumeComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(DashboardRoutes) ],
    exports: [ RouterModule ],
    providers: [ DashboardGuard ]
})

export class DashboarRoutingModule {}
