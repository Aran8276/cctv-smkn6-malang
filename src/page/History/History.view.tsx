import React, { FC } from "react";
import { HistoryViewProps } from "./History.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import HistoryTable from "./Table/HistoryTable";

const HistoryView: FC<HistoryViewProps> = ({ setSearch }) => {
  return (
    <>
      <Header heading="Riwayat">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          id="search"
          type="search"
          placeholder="Cari..."
          className="w-full rounded-lg bg-background pl-8"
        />
      </Header>
      <BreadcrumbString value="Beranda/Riwayat" />
      <section>
        <HistoryTable />
      </section>
    </>
  );
};

export default HistoryView;
