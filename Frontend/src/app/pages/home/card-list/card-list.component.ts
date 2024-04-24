import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListDataService } from './list-data.service';
import { ProductService } from 'src/app/@core/services/product.service';
import { ProductParam, ProductQuantity } from 'src/app/@core/data/product';
import { BACKEND_URL } from 'src/app/@core/data/common';

@Component({
  selector: 'da-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  listData: ProductQuantity[] = [];
  imageSrc = `${BACKEND_URL}/products/images`
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 12,
  };

  pageSizeOptions = [6, 12, 24];

  keyword = '';

  busy: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getList();
  }

  search() {
    this.getList();
  }

  getList(params: ProductParam = {limit: this.pager.pageSize, offset:this.pager.pageIndex - 1, code: this.keyword}) {
    this.busy = this.productService.getProductQuantity(params)
    .subscribe((res) => {
      this.pager.total = res.productsCount;
      this.listData = [...res.products];
      
    });
  }

  onPageChange(e) {
    this.pager.pageIndex = e;
    this.getList();
  }

  onSizeChange(e) {
    this.pager.pageSize = e;
    this.getList();
  }
}
