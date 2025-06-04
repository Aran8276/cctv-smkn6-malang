import React, { FC } from "react";
import { DatasetViewProps } from "./Dataset.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import { Plus, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import DatasetTable from "./Table/DatasetTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";

const DatasetView: FC<DatasetViewProps> = ({ setSearch }) => {
  return (
    <>
      <Header heading="Dataset">
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

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="rounded-xl w-[170px]">
                <Plus />
                Tambah Dataset
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="pb-4">
                <DialogTitle>Tambah Dataset</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Nama</Label>
                  <Input id="name-1" name="name" placeholder="fahminur" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-2">Encoding</Label>
                  <Input
                    id="name-2"
                    name="name"
                    placeholder="toyotacalya@gmail.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-3">Detected Encoding</Label>
                  <Input id="name-3" name="name" placeholder="placeholder" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="rounded-xl" variant="outline">
                    Batalkan
                  </Button>
                </DialogClose>
                <Button className="rounded-xl" type="submit">
                  <Plus />
                  Tambah Dataset
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </Header>
      <BreadcrumbString value="Beranda/Dataset" />
      <section>
        <DatasetTable />
      </section>
    </>
  );
};

export default DatasetView;
