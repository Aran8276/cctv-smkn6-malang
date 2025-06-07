"use client";

import React, { useEffect, useState } from "react";
import UserDataView from "./UserData.view";
import { UserDataTableContext } from "./Table/UserDataTable.context";
import { User, UserFormData } from "./UserData.type";
import { AxiosError } from "axios";
import { client } from "@/utils/client";

export default function UserData() {
  const [users, setUser] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await client.get(`/api/users?_=${timestamp}`);

      const usersData = response.data.users || response.data || [];
      setUser(usersData);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingUser) {
      await handleUpdateUser();
    } else {
      await handleCreateUser();
    }
  };

  const handleCreateUser = async () => {
    try {
      await client.post("/api/users", formData);
      await fetchUsers(); 
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Gagal membuat user:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    const payload = { ...formData };
    if (!payload.password) {
      delete payload.password;
    }

    try {
      await client.put(`/api/users/${editingUser.id}`, payload);
      setIsDialogOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Gagal memperbarui user:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      try {
        await client.delete(`/api/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Gagal menghapus user:", error);
      }
    }
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setFormData({ username: "", email: "", password: "", role: "user" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    });
    setIsDialogOpen(true);
  };

  return (
    <UserDataTableContext.Provider value={{ search }}>
      <UserDataView
        users={users}
        search={search}
        setSearch={setSearch}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        handleDeleteUser={handleDeleteUser}
      />
    </UserDataTableContext.Provider>
  );
}
