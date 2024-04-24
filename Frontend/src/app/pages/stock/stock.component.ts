import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';
import { Stock } from 'src/app/@core/data/stock';
import { StockService } from 'src/app/@core/services/stock.service';
import { StockParam } from 'src/app/@core/data/param';
import { showDialogError } from 'src/app/@core/data/common';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent {
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };
  
  searchProduct: string = null;
  listData: Stock[] = [];
  isEdit: Boolean = true;
  editIdx: number = 0;

  headerNewForm = false;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: ''
  };

  defaultRowData: Stock = {
    id: -1,
    productCode: '',
    quantity: 0
  };
  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(
    private stockService: StockService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getList();
  }

  onSearch(evt) {
    this.getList();
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList(params: StockParam = {limit: this.pager.pageSize, offset: this.pager.pageIndex - 1, code: this.searchProduct}) {
    this.busy = this.stockService.getStock(params)
      .subscribe((res) => {
        this.listData = res.stocks;
        this.pager.total = res.stockCount;
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
    this.defaultRowData = { productCode: '', quantity: 0};
    this.isEdit = false;
    this.headerNewForm = true;
  }

  quickRowAdded(e) {
    const newData = { ...e };
    if(!this.isEdit) {
      this.stockService.addStock(newData).subscribe({
        next: (res) => { this.getList()},
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error, this.dialogService);
        }
      });
    } else {
      // this.listData.splice(this.editIdx, 1, newData);
      this.stockService.updateStock(newData).subscribe({
        next: (res) => { this.getList()},
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error, this.dialogService);
        }
      });;
    }
    this.headerNewForm = false;
  }

  quickRowCancel() {
    this.headerNewForm = false;
  }

  toggleExpand(rowItem) {
    if (rowItem.$expandConfig) {
      rowItem.$expandConfig.expand = !rowItem.$expandConfig.expand;
    }
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
    let stock = this.listData[index];
    this.defaultRowData = {...stock};
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
            this.stockService.deleteStock(this.listData[index]).subscribe();
            this.listData.splice(index, 1);
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
