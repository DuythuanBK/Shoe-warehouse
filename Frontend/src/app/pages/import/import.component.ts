import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';
import { Import } from 'src/app/@core/data/import';
import { ImportService } from 'src/app/@core/services/import.service';
import { ImportParam } from 'src/app/@core/data/param';
import { showDialogError } from 'src/app/@core/data/common';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent {
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };

  
  listData: Import[] = [];
  isEdit: Boolean = false;
  editIdx: number = 0;

  headerNewForm = false;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: ''
  };

  shipCodeSearch: string = '';
  orderCodeSearch: string = '';
  dateSearch: string = '';
  statusSearch: string = '';
  productCodeSearch: string = '';
  statusOptions:string[] = ["Đã nhập hàng", "Nhập kho", "Đã hủy", "Hàng đang về"];

  defaultRowData: Import = {
    id: -1,
    shipCode: '',
    orderCode: '',
    importDate: new Date(),
    productCode: '',
    price: '',
    shipFee: '',
    status: '',
    note: ''
  };

  
  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(
    private importService: ImportService,
    private dialogService: DialogService
  ) {}

  onSearch() {
    this.getList();
  }

  onDatePickerClearAll() {
    this.dateSearch = '';
    
  }

  onClearSearch(){
    this.shipCodeSearch = '';
    this.orderCodeSearch = '';
    this.dateSearch = '';
    this.statusSearch = '';
    this.productCodeSearch = '';
  }

  ngOnInit() {
    this.getList();
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  formatDate(dateStr: string): string {
    if(dateStr === '')
      return '';
    // Parse the original date string
    const originalDate = new Date(dateStr);
  
    // Extract individual components
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const year = originalDate.getFullYear();
  
    // Format the new date string
    const formattedDateString = `${day}-${month}-${year}`;
  
    return formattedDateString;
  }

  getList(params: ImportParam = {limit: this.pager.pageSize, offset: this.pager.pageIndex - 1}) {
    params.shipCode = this.shipCodeSearch;
    params.orderCode = this.orderCodeSearch;
    params.importDate = this.formatDate(this.dateSearch);
    params.status = this.statusSearch;
    params.productCode = this.productCodeSearch;
    this.busy = this.importService.getImports(params)
      .subscribe((res) => {
        this.listData = res.imports;
        this.pager.total = res.importCount;
      });
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  };

  beforeEditEnd = (rowItem, field) => {
    console.log('beforeEditEnd');
    if (rowItem && rowItem[field].length < 3) {
      return false;
    } else {
      return true;
    }
  };

  newRow() {
    this.defaultRowData = {
      shipCode: '',
      orderCode: '',
      importDate: new Date(),
      productCode: '',
      price: '',
      shipFee: '',
      status: '',
      note: ''
    };
    this.isEdit = false;
    this.headerNewForm = true;
  }

  quickRowAdded(e) {
    const newData = { ...e };
    newData.importDate = this.formatDate(newData.importDate);
    if(!this.isEdit) {
      this.importService.addImport(newData).subscribe({
        next: (res) => { this.getList()},
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error, this.dialogService);
        }
      });
    } else {
      this.importService.updateImport(newData).subscribe({
        next: null,
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error, this.dialogService);
        }
      });
    }
    this.headerNewForm = false;
  }

  quickRowCancel() {
    this.headerNewForm = false;
  }


  onPageChange (e) {
    this.pager.pageIndex = e;
    this.getList()
  }

  onSizeChange (e) {
    this.pager.pageSize = e;
    this.getList()
  }

  editRow(index) {
    let expense = this.listData[index];
    this.defaultRowData = {...expense};
    this.isEdit = true;
    this.editIdx = index;
    this.headerNewForm = true;
  }

  deleteRow(index) {
    const results = this.dialogService.open({
      id: 'delete-dialog',
      width: '346px',
      maxHeight: '600px',
      title: 'Delete',
      showAnimate: false,
      content: 'Are you sure you want to delete it?',
      backdropCloseable: true,
      onClose: () => {},
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          disabled: false,
          handler: () => {
            this.listData.splice(index, 1);
            this.importService.deleteImport(this.listData[index]).subscribe();
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Cancel',
          handler: () => {
            results.modalInstance.hide();
          },
        },
      ],
    });
  }
}
