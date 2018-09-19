import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardGuard } from './dashboard.guard';

import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentUploadComponent } from './payment/payment-upload/payment-upload.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ DashboardGuard ],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'payment/list',  component: PaymentListComponent },
            { path: 'payment/upload',  component: PaymentUploadComponent }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(DashboardRoutes) ],
    exports: [ RouterModule ]
})

export class DashboarRoutingModule {}
