import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardGuard } from './dashboard.guard';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentUploadComponent } from './payment/payment-upload/payment-upload.component';

export const DashboardRoutes: Routes = [
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
    exports: [ RouterModule ],
    providers: [ DashboardGuard ]
})

export class DashboarRoutingModule {}
