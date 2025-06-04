import { Table } from "@tanstack/react-table";
import { Payment } from "./DatasetTable.dummy.data";

export interface DatasetTableType {
  table: Table<Payment>;
}
