"use client";

import React, { useEffect, useState } from "react";
import DatasetView from "./Dataset.view";
import { DatasetTableContext } from "./Table/DatasetTable.context";
import { Dataset as DataSetType, DatasetFormData } from "./Dataset.type";
import { client } from "@/utils/client";

export default function Dataset() {
  const [datasets, setDatasets] = useState<DataSetType[]>([]);
  const [search, setSearch] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDataset, setEditingDataset] = useState<DataSetType | null>(
    null
  );
  const [formData, setFormData] = useState<DatasetFormData>({
    name: "",
    encoding: "",
    detected_encoding: "",
  });

  const fetchDatasets = async () => {
    try {
      const response = await client.get("/api/dataset");
      setDatasets(response.data.datasets || response.data || []);
    } catch (error) {
      console.error("Gagal mengambil dataset:", error);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleCreateDataset = async () => {
    try {
      await client.post("/api/dataset", formData);
      setIsDialogOpen(false);
      await fetchDatasets();
    } catch (error) {
      console.error("Gagal membuat dataset:", error);
    }
  };

  const handleUpdateDataset = async () => {
    if (!editingDataset) return;

    setDatasets((current) =>
      current.map((d) =>
        d.face_id === editingDataset.face_id ? { ...d, ...formData } : d
      )
    );
    setIsDialogOpen(false);
    setEditingDataset(null);

    try {
      await client.put(`/api/dataset/${editingDataset.face_id}`, formData);
    } catch (error) {
      console.error("Gagal update dataset di server:", error);
      fetchDatasets();
    }
  };

  const handleDeleteDataset = (faceId: string) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus dataset ini?"))
      return;

    setDatasets((current) => current.filter((d) => d.face_id !== faceId));

    try {
      client.delete(`/api/dataset/${faceId}`);
    } catch (error) {
      console.error("Gagal hapus dataset di server:", error);
      fetchDatasets();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingDataset) {
      handleUpdateDataset();
    } else {
      handleCreateDataset();
    }
  };

  const openCreateDialog = () => {
    setEditingDataset(null);
    setFormData({ name: "", encoding: "", detected_encoding: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (dataset: DataSetType) => {
    setEditingDataset(dataset);
    setFormData({
      name: dataset.name,
      encoding: dataset.encoding,
      detected_encoding: dataset.detected_encoding || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <DatasetTableContext.Provider value={{ search }}>
      <DatasetView
        datasets={datasets}
        search={search}
        setSearch={setSearch}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingDataset={editingDataset}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        openCreateDialog={openCreateDialog}
        openEditDialog={openEditDialog}
        handleDeleteDataset={handleDeleteDataset}
      />
    </DatasetTableContext.Provider>
  );
}
