"use client";

import React, { useEffect, useState } from "react";
import ReportListView from "./ReportList.view";
import { ReportListTableContext } from "./Table/ReportListTable.context";
import {
  PostReportListResponse,
  ReportListFormData,
  ReportList as ReportListType,
} from "./ReportList.type";
import { client } from "@/utils/client";
import { AxiosError } from "axios";
import { User } from "../Login/Login.type";
import { GetUserResponse } from "@/components/custom/layout/Sidebar/Sidebar.type";

export default function ReportList() {
  const [reportlists, setReportLists] = useState<ReportListType[]>([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReportList, setEditingReportList] =
    useState<ReportListType | null>(null);
  const [formData, setFormData] = useState<ReportListFormData>({
    subject: "",
    content: "",
    recipient_kepsek_username: "",
  });

  const fetchReportLists = async (role: string) => {
    try {
      if (role === "security") {
        const response = await client.get("/api/reports/sent");
        setReportLists(response.data.reportlists || response.data || []);
      } else if (role === "kepsek") {
        const response = await client.get("/api/reports/received");
        setReportLists(response.data.reportlists || response.data || []);
      }
    } catch (error) {
      console.error("Gagal mengambil reportlist:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReportLists(user.role);
    }
  }, [user]);

  const handleCreateReportList = async () => {
    try {
      const res: PostReportListResponse = (
        await client.post("/api/reports", formData)
      ).data;

      if (res.report) {
        setIsDialogOpen(false);
        await fetchReportLists("security");
      }
    } catch (error) {
      console.error("Gagal membuat reportlist:", error);
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message || error.message);
      }
    }
  };

  const handleUpdateReportList = async () => {
    if (!editingReportList) return;

    setReportLists((current) =>
      current.map((d) =>
        d.report_id === editingReportList.report_id ? { ...d, ...formData } : d
      )
    );
    setIsDialogOpen(false);
    setEditingReportList(null);

    try {
      await client.put(`/api/reports/${editingReportList.report_id}`, formData);
    } catch (error) {
      console.error("Gagal update reportlist di server:", error);
      fetchReportLists("security");
    }
  };

  const handleDeleteReportList = (report_id: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus reportlist ini?"))
      return;

    setReportLists((current) =>
      current.filter((d) => d.report_id.toString() !== report_id.toString())
    );

    try {
      client.delete(`/api/reports/${report_id}`);
    } catch (error) {
      console.error("Gagal hapus reportlist di server:", error);
      fetchReportLists("security");
    }
  };

  const getUser = async () => {
    try {
      const res: GetUserResponse = (await client.get("/api/auth/me")).data;
      if (res.user) {
        setUser(res.user);
      }
    } catch (error) {
      console.error("Gagal mengambil dataset:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("ok");
    if (editingReportList) {
      handleUpdateReportList();
    } else {
      handleCreateReportList();
    }
  };

  const openCreateDialog = () => {
    setEditingReportList(null);
    setFormData({
      subject: "",
      content: "",
      recipient_kepsek_username: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (reportlist: ReportListType) => {
    setEditingReportList(reportlist);
    setFormData({
      subject: reportlist.subject,
      content: reportlist.content,
      recipient_kepsek_username: "",
    });
    setIsDialogOpen(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ReportListTableContext.Provider value={{ search }}>
      <ReportListView
        user={user}
        reportlists={reportlists}
        search={search}
        setSearch={setSearch}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingReportList={editingReportList}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        handleDeleteReportList={handleDeleteReportList}
      />
    </ReportListTableContext.Provider>
  );
}
