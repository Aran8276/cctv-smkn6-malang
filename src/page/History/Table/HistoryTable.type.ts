import { Table } from "@tanstack/react-table";
import { Payment } from "./HistoryTable.dummy.data";

export interface HistoryTableType {
  table: Table<Payment>;
}
