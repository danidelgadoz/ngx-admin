import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PaymentResumeComponent } from './payment/payment-resume/payment-resume.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            { path: 'home', component: HomeComponent },
            { path: 'payment/list',  component: PaymentListComponent },
            { path: 'payment/resume',  component: PaymentResumeComponent },
            {
                path: 'customer',
                loadChildren: './customer/customer.module#CustomerModule',
            },
            {
                path: 'product',
                loadChildren: './product/product.module#ProductModule',
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(DashboardRoutes) ],
    exports: [ RouterModule ]
})

export class DashboarRoutingModule {}
