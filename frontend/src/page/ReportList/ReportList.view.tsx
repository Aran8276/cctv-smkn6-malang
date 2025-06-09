import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import ReportListTable from "./Table/ReportListTable";
import { Plus, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { ReportListViewProps } from "./ReportList.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ReportListView: FC<ReportListViewProps> = ({
  user,
  reportlists,
  search,
  setSearch,
  isDialogOpen,
  setIsDialogOpen,
  editingReportList,
  formData,
  setFormData,
  handleSubmit,
  openCreateDialog,
  openEditDialog,
  handleDeleteReportList,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Header heading="Laporan">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <SearchIcon className="h-4 w-4" />
        </div>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          id="search"
          type="search"
          placeholder="Cari..."
          className="w-[200px] rounded-lg bg-background pl-8"
        />
        {user?.role === "security" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="rounded-xl w-[170px]"
                onClick={openCreateDialog}
              >
                <Plus />
                Tambah Laporan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader className="pb-4">
                  <DialogTitle>Tambah Laporan</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="subject">Subjek</Label>
                    <Input
                      onChange={handleInputChange}
                      id="subject"
                      name="subject"
                      placeholder="fahminur"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Konten</Label>
                    <Textarea
                      onChange={handleInputChange}
                      id="content"
                      name="content"
                      placeholder="fahminur"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="recipient_kepsek_username">
                      Verifikasi Nama Kepala Sekolah
                    </Label>
                    <Input
                      onChange={handleInputChange}
                      id="recipient_kepsek_username"
                      name="recipient_kepsek_username"
                      placeholder="(Verifikasi Nama Anda)"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button
                      className="rounded-xl"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Batalkan
                    </Button>
                  </DialogClose>
                  <Button className="rounded-xl" type="submit">
                    <Plus />
                    {editingReportList ? "Simpan Perubahan" : "Tambah Laporan"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </Header>
      <BreadcrumbString value="Beranda/Laporan" />
      <section>
        <ReportListTable
          data={reportlists}
          onEdit={openEditDialog}
          onDelete={handleDeleteReportList}
          search={search}
        />
      </section>
    </>
  );
};

export default ReportListView;
