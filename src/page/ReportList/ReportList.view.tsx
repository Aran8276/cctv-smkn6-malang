import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import ReportListTable from "./Table/ReportListTable";
import { Plus, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { ReportListViewProps } from "./ReportList.type";
import { Button } from "@/components/ui/button";

const ReportListView: FC<ReportListViewProps> = ({ setSearch }) => {
  return (
    <>
      <Header heading="Laporan">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          onChange={(event) => setSearch(event.target.value)}
          id="search"
          type="search"
          placeholder="Cari..."
          className="w-[200px] rounded-lg bg-background pl-8"
        />
        <Button className="rounded-xl w-[170px]">
          <Plus />
          Tambah Laporan
        </Button>
      </Header>
      <BreadcrumbString value="Beranda/Laporan" />
      <section>
        <ReportListTable />
      </section>
    </>
  );
};

export default ReportListView;
