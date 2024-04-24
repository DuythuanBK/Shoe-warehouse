import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';
import { Order, DisplayOrder } from 'src/app/@core/data/order';
import { OrderService } from 'src/app/@core/services/order.service';
import { OrderParam } from 'src/app/@core/data/param';
import { showDialogError } from 'src/app/@core/data/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  layoutDirection: FormLayout = FormLayout.Horizontal; 
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };
  
  listData: Order[] = [];
  isEdit: Boolean = false;
  editIdx: number = 0;

  headerNewForm = false;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: ''
  };

  statusOptions = ["Đang chuẩn bị hàng", "Đang giao", "Đã hủy", "Giao thành công"];
  phoneNumberSearch: string = '';
  customerNameSearch: string = '';
  productCodeSearch: string = '';
  statusSearch: string = '';

  defaultRowData: DisplayOrder;
  
  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(
    private orderService: OrderService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.getList();
  }

  onSearch() {
    
  }

  onClearSearch(){
    this.phoneNumberSearch = '';
    this.customerNameSearch = '';
    this.productCodeSearch = '';
    this.statusSearch = '';
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList(params: OrderParam = {limit: this.pager.pageSize, offset: this.pager.pageIndex - 1}) {
    params.customerName = this.customerNameSearch;
    params.phoneNumber = this.phoneNumberSearch;
    params.productCode = this.productCodeSearch;
    params.status = this.statusSearch;
    this.busy = this.orderService.getOrders(params)
      .subscribe((res) => {
        this.listData = res.orders;
        this.pager.total = res.orderCount;
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
      productCode: '',
      quantity: 0,
      weight: '',
      price: '',
      shipTime: '',
      shipService: '',
      status: '',
      note: ''
    };
    this.isEdit = false;
    this.headerNewForm = true;
  }

  convertToOrder(displayOrder: DisplayOrder): Order {
    const order: Order = {
      id: displayOrder.id,
      customer: {
        id: displayOrder.customerId,
        phoneNumber: displayOrder.phoneNumber,
        address: displayOrder.address,
        name: displayOrder.name,
      },
      productCode: displayOrder.productCode,
      quantity: displayOrder.quantity,
      weight: displayOrder.weight,
      price: displayOrder.price,
      shipTime: displayOrder.shipTime,
      shipService: displayOrder.shipService,
      status: displayOrder.status,
      note: displayOrder.note,
    };
    return order;
  }

  convertToDisplayOrder(order: Order): DisplayOrder {
    const displayOrder: DisplayOrder = {
      id: order.id,
      customerId: order.customer.id,
      phoneNumber: order.customer?.phoneNumber,
      address: order.customer?.address,
      name: order.customer?.name,
      productCode: order.productCode,
      quantity: order.quantity,
      weight: order.weight,
      price: order.price,
      shipTime: order.shipTime,
      shipService: order.shipService,
      status: order.status,
      note: order.note,
    };
    return displayOrder;
  }

  quickRowAdded(e: DisplayOrder) {
    const newData: Order = this.convertToOrder(e)
    if(!this.isEdit) {
      this.orderService.addOrder(newData)
      .subscribe({
        next: (res) => {
          this.getList();
        },
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error[0], this.dialogService);
      }})
    } else {
      this.listData.splice(this.editIdx, 1, newData);
      this.orderService.updateOrder(newData).subscribe({
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
    let order = this.listData[index];
    this.defaultRowData = this.convertToDisplayOrder(order);
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
            this.orderService.deleteOrder(this.listData[index]).subscribe((res) => {
              this.getList();
            });
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
