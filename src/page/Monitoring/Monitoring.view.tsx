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
import { MoreVertical, Plus, SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MonitoringView: FC<MonitoringViewProps> = ({
  cctvs,
  postCCTV,
  deleteCCTV,
  open,
  setOpen,
}) => {
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

        <Dialog open={open} onOpenChange={setOpen}>
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
            <form onSubmit={postCCTV} className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="location">Lokasi CCTV</Label>
                <Input id="location" name="location" placeholder="fahminur" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="rtsp">IP CCTV (RTSP)</Label>
                <Input id="rtsp" name="rtsp" placeholder="fahminur" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="status">Status</Label>
                <Select name="status">
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
            </form>
          </DialogContent>
        </Dialog>
      </Header>
      <BreadcrumbString value="Beranda/Pemantauan" />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {Array.isArray(cctvs) &&
          cctvs.map((item, index) => (
            <div className="relative" key={index}>
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

              <div className="absolute px-8 py-6 right-0 bottom-0 text-white">
                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 z-100 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={() => {
                            document.body.style.pointerEvents = "";
                            console.log(item.cctv_id);
                          }}
                          className="text-red-500"
                        >
                          Hapus
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Perintah ini tidak bisa dikembalikan. Ini akan
                          menghapus data CCTV dari server selamanya.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-400"
                          onClick={() => deleteCCTV(item.cctv_id)}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </DropdownMenu>
                </AlertDialog>
              </div>
            </div>
          ))}
      </section>
    </>
  );
};

export default MonitoringView;
