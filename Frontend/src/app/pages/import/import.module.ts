import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';

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
    ImportComponent
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
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
  exports: [ImportComponent],
  providers: [ListDataService],
  
})
export class ImportModule { }
