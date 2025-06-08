import { Dispatch, FormEvent, SetStateAction } from "react";

export interface Dataset {
  face_id: string;
  name: string;
  encoding: string;
  detected_encoding: string | null;
  created_at: string;
}

export interface DatasetFormData {
  name: string;
  encoding: string;
  detected_encoding?: string;
}

export interface DatasetViewProps {
  datasets: Dataset[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  editingDataset: Dataset | null;
  formData: DatasetFormData;
  setFormData: Dispatch<SetStateAction<DatasetFormData>>;

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  openCreateDialog: () => void;
  openEditDialog: (dataset: Dataset) => void;
  handleDeleteDataset: (faceId: string) => void;
}
