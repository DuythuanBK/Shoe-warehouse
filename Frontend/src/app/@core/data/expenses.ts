import { Params } from "@angular/router";
import { BaseParam } from "./param";

export interface Expenses {
  id?: number;
  date?: Date;
  total?: string;
  note?: string;
}

export interface MultipleExpenes {
  expensesList: Expenses[];
  expensesCount: number;
}

