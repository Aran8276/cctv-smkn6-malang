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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const DatasetView: FC<DatasetViewProps> = ({
  datasets,
  search,
  setSearch,
  isDialogOpen,
  setIsDialogOpen,
  editingDataset,
  formData,
  setFormData,
  handleSubmit,
  openCreateDialog,
  openEditDialog,
  handleDeleteDataset,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Header heading="Dataset">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            id="search"
            type="search"
            placeholder="Cari..."
            className="w-[200px] rounded-lg bg-background pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl w-[170px]" onClick={openCreateDialog}>
              <Plus /> Tambah Dataset
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader className="pb-4">
                <DialogTitle>
                  {editingDataset ? "Edit Dataset" : "Tambah Dataset"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="fahminur"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="encoding">Encoding</Label>
                  <Input
                    id="encoding"
                    name="encoding"
                    value={formData.encoding}
                    onChange={handleInputChange}
                    placeholder="Nilai encoding..."
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="detected_encoding">Detected Encoding</Label>
                  <Input
                    id="detected_encoding"
                    name="detected_encoding"
                    value={formData.detected_encoding || ""}
                    onChange={handleInputChange}
                    placeholder="Opsional..."
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batalkan
                </Button>
                <Button type="submit">
                  {editingDataset ? "Simpan Perubahan" : "Tambah Dataset"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Header>
      <BreadcrumbString value="Beranda/Dataset" />
      <section className="mt-4">
        <DatasetTable
          data={datasets}
          onEdit={openEditDialog}
          onDelete={handleDeleteDataset}
          search={search}
        />
      </section>
    </>
  );
};

export default DatasetView;
