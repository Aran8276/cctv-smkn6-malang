import React, { FC, Fragment } from "react";
import { MonitoringViewProps } from "./Monitoring.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import MonitoringCard from "@/components/custom/etc/MonitoringCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MonitoringCardTable from "@/components/custom/etc/MonitoringCard/Table/MonitoringCardTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MonitoringView: FC<MonitoringViewProps> = ({ cctvs }) => {
  return (
    <>
      <Header heading="Pemantauan">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          // onChange={(event) => setSearch(event.target.value)}
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
                Tambah CCTV
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="pb-4">
                <DialogTitle>Tambah CCTV</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">IP CCTV</Label>
                  <Input id="name-1" name="name" placeholder="fahminur" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Lokasi CCTV</Label>
                  <Input id="name-1" name="name" placeholder="fahminur" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Status</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Nonaktif</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                  Tambah CCTV
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </Header>
      <BreadcrumbString value="Beranda/Pemantauan" />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {Array.isArray(cctvs) &&
          cctvs.map((item, index) => (
            <Fragment key={index}>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer hover:scale-[1.01] transition-all">
                    <MonitoringCard key={index} cameraName={item.location} />
                  </div>
                </DialogTrigger>
                <DialogContent className="flex space-y-3 flex-col h-[600px] overflow-y-scroll">
                  <MonitoringCard key={index} cameraName={item.location} />
                  <section>
                    <DialogHeader className="flex flex-col space-y-3">
                      <DialogTitle>Daftar Laporan</DialogTitle>
                      <MonitoringCardTable />
                    </DialogHeader>
                  </section>
                </DialogContent>
              </Dialog>
            </Fragment>
          ))}
      </section>
    </>
  );
};

export default MonitoringView;
