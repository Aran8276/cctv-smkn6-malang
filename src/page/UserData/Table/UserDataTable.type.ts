import { Table } from "@tanstack/react-table";
import { Payment } from "./UserDataTable.dummy.data";

export interface UserDataTableType {
  table: Table<Payment>;
}
