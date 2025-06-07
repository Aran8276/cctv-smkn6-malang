import React, { FC } from "react";
import { UserDataViewProps } from "./UserData.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import { Plus, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserDataTable from "./Table/UserDataTable";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserDataView: FC<UserDataViewProps> = ({
  setSearch,
  search,
  table,
  isDialogOpen,
  setIsDialogOpen,
  editingUser,
  formData,
  setFormData,
  handleSubmit,
  openCreateDialog,
  openEditDialog,
  handleDeleteUser,
  users,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  return (
    <>
      <Header heading="Data User">
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
        <Button className="rounded-xl" onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah User
        </Button>
      </Header>
      <BreadcrumbString value="Beranda/Data User" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="pb-4">
              <DialogTitle>
                {editingUser ? "Edit User" : "Tambah User"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={editingUser ? "Kosongkan jika tidak diubah" : ""}
                  required={!editingUser}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kepsek">Kepsek</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
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
                {editingUser ? "Simpan Perubahan" : "Tambah User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <section>
        <UserDataTable
          data={users}
          onEdit={openEditDialog}
          onDelete={handleDeleteUser}
          search={search}
        />
      </section>
    </>
  );
};

export default UserDataView;
