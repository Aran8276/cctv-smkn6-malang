import { Table } from "@tanstack/react-table";
import { Payment } from "./ReportListTable.dummy.data";

export interface ReportListTableType {
  table: Table<Payment>;
}
