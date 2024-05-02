import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product, ProductParam } from 'src/app/@core/data/product';
import { BaseParam } from 'src/app/@core/data/param';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showDialogError } from 'src/app/@core/data/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  userProfileForm: FormGroup;
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };

  searchProduct: string = null;

  listData: Product[] = [];
  headerNewForm = false;
  isEdit = false;
  editIdx = 0;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: '',
  };

  defaultRowData: Product = {
    id: -1,
    code: '',
    note: '',
  };

  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(private productService: ProductService, private dialogService: DialogService, private formBuilder: FormBuilder) {
    this.userProfileForm = this.formBuilder.group({
      code: ['', Validators.required],
      note: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userProfileForm.patchValue({
      image: file,
    });
    this.userProfileForm.get('image').updateValueAndValidity();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('code', this.userProfileForm.get('code').value);
    formData.append('note', this.userProfileForm.get('note').value);
    formData.append('image', this.userProfileForm.get('image').value);
    this.productService.createProduct(formData).subscribe((res) => {
      this.getList();
    });
  }

  onSearch(evt) {
    this.getList();
  }

  ngOnInit() {
    this.getList();
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList(params: ProductParam = { limit: this.pager.pageSize, offset: this.pager.pageIndex - 1, code: this.searchProduct }) {
    this.busy = this.productService.getProducts(params).subscribe((res) => {
      this.pager.total = res.productsCount;
      this.listData = [...res.products];
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
    this.defaultRowData = { code: '', note: '' };
    this.isEdit = false;
    this.headerNewForm = true;
  }
  exportProducts() {
    this.productService.exportProducts();
  }

  quickRowAdded(e) {
    const newProduct: Product = { ...e };

    if (!this.isEdit) {
      this.productService.addProduct(newProduct).subscribe({
        next: (res) => {
          this.getList();
        },
        error: (res) => {
          const error = res.error.errors.body;
          showDialogError(error, this.dialogService);
        },
      });
    } else {
      // this.listData.splice(this.editIdx, 1, newProduct);
      this.productService.updateProduct(newProduct).subscribe({
        next: (res) => {
          this.getList();
        },
        error: (res) => {
          const error = res.error.errors.body;
          showDialogError(error, this.dialogService);
        },
      });
    }
    this.headerNewForm = false;
  }

  quickRowCancel() {
    this.headerNewForm = false;
  }

  onPageChange(e) {
    this.pager.pageIndex = e;
    const params: ProductParam = { offset: this.pager.pageIndex - 1, limit: this.pager.pageSize };
    this.getList(params);
  }

  onSizeChange(e) {
    this.pager.pageSize = e;
    const params: ProductParam = { offset: this.pager.pageIndex - 1, limit: this.pager.pageSize };
    this.getList(params);
  }

  editRow(index) {
    let product = this.listData[index];
    this.defaultRowData = { ...product };
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
            this.productService.deleteProduct(this.listData[index]).subscribe((res) => {
              this.getList();
            });
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
