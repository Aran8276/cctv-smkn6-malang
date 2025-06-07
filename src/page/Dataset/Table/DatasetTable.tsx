"use client";

import * as React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { MoreVertical, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dataset } from "../Dataset.type";
import DatasetTableView from "./DatasetTable.view";
interface GetColumnsProps {
  onEdit: (dataset: Dataset) => void;
  onDelete: (faceId: string) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Dataset>[] => [
  {
    accessorKey: "face_id",
    header: "Face ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Dibuat Pada",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString("id-ID"),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const dataset = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(dataset)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(dataset.face_id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DatasetTableProps {
  data: Dataset[];
  onEdit: (dataset: Dataset) => void;
  onDelete: (faceId: string) => void;
  search: string;
}

const DatasetTable: React.FC<DatasetTableProps> = ({
  data,
  onEdit,
  onDelete,
  search,
}) => {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo(
    () => getColumns({ onEdit, onDelete }),
    [onEdit, onDelete]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  React.useEffect(() => {
    setGlobalFilter(search);
  }, [search]);

  return <DatasetTableView table={table} columns={columns} />;
};

export default DatasetTable;
