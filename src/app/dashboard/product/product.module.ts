import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ...ProductRoutingModule.components
  ],
  imports: [
    ProductRoutingModule
  ]
})
export class ProductModule { }
