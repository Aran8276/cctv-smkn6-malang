import { Table } from "@tanstack/react-table";
import { Payment } from "./MonitoringCardTable.dummy.data";

export interface MonitoringCardTableType {
  table: Table<Payment>;
}
