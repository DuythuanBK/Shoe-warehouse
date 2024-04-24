import { Component, OnInit } from '@angular/core';
import { DialogService, EditableTip, FormLayout, TableWidthConfig } from 'ng-devui';
import { Subscription } from 'rxjs';
import { FormConfig } from 'src/app/@shared/components/admin-form';
import { COLUMN_CONFIG, TABLE_WITH_CONFIG } from './table-config';
import { ExpensesService } from 'src/app/@core/services/expenses.service';
import { Expenses } from 'src/app/@core/data/expenses';
import { ExpensesParam } from 'src/app/@core/data/param';
import { showDialogError } from 'src/app/@core/data/common';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  editableTip = EditableTip.btn;
  nameEditing: boolean;
  busy: Subscription;
  pager = {
    total: 0,
    pageIndex: 1,
    pageSize: 5,
  };
  dateSearch: string = '';
  listData: Expenses[] = [];
  isEdit: Boolean = false;
  editIdx: number = 0;
  headerNewForm = false;

  formConfig: FormConfig = {
    layout: FormLayout.Horizontal,
    items: COLUMN_CONFIG,
    labelSize: ''
  };

  defaultRowData: Expenses = {
    id: -1,
    total: '',
    date: new Date(),
    note: ''
  };
  tableWidthConfig: TableWidthConfig[] = TABLE_WITH_CONFIG;

  constructor(
    private expensesService: ExpensesService,
    private dialogService: DialogService
  ) {}
  

  onSearch() {
    this.getList();
  }

  onClearSearch() {
    this.dateSearch = '';
  }

  formatDate(dateStr: string): string {
    if(dateStr === '')
      return '';
    console.log(dateStr)
    // Parse the original date string
    const originalDate = new Date(dateStr);

    console.log(originalDate)

    // Extract individual components
    const day = originalDate.getDate().toString().padStart(2, '0');
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const year = originalDate.getFullYear();

    // Format the new date string
    const formattedDateString = `${day}-${month}-${year}`;

    return formattedDateString;
  }

  ngOnInit() {
    this.getList();
  }

  onEditEnd(rowItem, field) {
    rowItem[field] = false;
  }

  getList(params: ExpensesParam = {limit: this.pager.pageSize, offset: this.pager.pageIndex - 1, date: this.formatDate(this.dateSearch)}) {
    this.busy = this.expensesService.getExpenses(params)
      .subscribe((res) => {
        this.listData = res.expensesList;
        this.pager.total = res.expensesCount;
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
    this.defaultRowData = { date: new Date(), total: '', note: ''};
    this.isEdit = false;
    this.headerNewForm = true;
  }

  quickRowAdded(e) {
    const newData = { ...e };
    const date = this.formatDate(newData.date);
    newData.date = date;
    if(!this.isEdit) {
      this.expensesService.addExpense(newData).subscribe({
        next: (res) => { this.getList()},
        error: (res) => {
          const error = res.error.errors.body[0];
          showDialogError(error, this.dialogService);
        }
      });
    } else {
      this.listData.splice(this.editIdx, 1, newData);
      this.expensesService.updateExpense(newData).subscribe({
        next: null,
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
    let product = this.listData[index];
    this.defaultRowData = {...product};
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
            this.expensesService.deleteExpense(this.listData[index])
              .subscribe((res) => {
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
