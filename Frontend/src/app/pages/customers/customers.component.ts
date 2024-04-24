import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { ListDataService } from './list-data.service';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  };
  
  listData = [];

  headerNewForm = false;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: ''
  };

  defaultRowData = {
    id: '',
    phoneNumber: '',
    name: '',
    address: ''
  };
  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(
    private listDataService: ListDataService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getList();
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList() {
    this.busy = this.listDataService
      .getListData(this.pager)
      .subscribe((res) => {
        const data = JSON.parse(JSON.stringify(res.pageList));
        data.$expandConfig = { expand: false };
        this.listData = data;
        this.pager.total = res.total;
      });
  }

  beforeEditStart = (rowItem, field) => {
    return true;
  };

  beforeEditEnd = (rowItem, field) => {
    if (rowItem && rowItem[field].length < 3) {
      return false;
    } else {
      return true;
    }
  };

  newRow() {
    this.defaultRowData = {
      id: '',
      phoneNumber: '',
      name: '',
      address: ''
    };
    this.headerNewForm = true;
  }

  getuuid() {
    return new Date().getTime() + 'CNWO';
  }

  quickRowAdded(e) {
    const newData = { ...e };
    this.listData.unshift(newData);
    this.headerNewForm = false;
  }

  quickRowCancel() {
    this.headerNewForm = false;
  }

  subRowAdded(index, item) {
    this.listData[index].$expandConfig.expand = false;
    const newData = { ...this.defaultRowData };
    this.listData.splice(index + 1, 0, newData);
  }

  subRowCancel(index) {
    this.listData[index].$expandConfig.expand = false;
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
    let product = this.listData[index];
    this.defaultRowData = {...product};
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
