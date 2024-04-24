import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import {
  AvatarModule,
  CardModule,
  DatepickerModule,
  LoadingModule,
  PaginationModule,
  SelectModule,
  TagsModule,
  DataTableModule
} from 'ng-devui';
import { SharedModule } from 'src/app/@shared/shared.module';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    DataTableModule,
    AdminFormModule,
    TagsModule,
    LoadingModule,
    CardModule,
    AvatarModule,
    PaginationModule,
    SelectModule,
    DatepickerModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductsComponent
  ],
})
export class ProductsModule { }
