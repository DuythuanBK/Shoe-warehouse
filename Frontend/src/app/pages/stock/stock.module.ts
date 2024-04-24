import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import {
  AvatarModule,
  CardModule,
  DataTableModule,
  DatepickerModule,
  LoadingModule,
  PaginationModule,
  SelectModule,
  TagsModule,
} from 'ng-devui';
import { ListDataService } from './list-data.service';
import { SharedModule } from 'src/app/@shared/shared.module';
import { AdminFormModule } from 'src/app/@shared/components/admin-form';

@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    DataTableModule,
    AdminFormModule,
    TagsModule,
    LoadingModule,
    CardModule,
    AvatarModule,
    PaginationModule,
    SelectModule,
    DatepickerModule
  ],
  exports: [StockComponent],
  providers: [ListDataService],
})
export class StockModule { }
