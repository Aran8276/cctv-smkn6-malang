import { Dispatch, FormEvent, SetStateAction } from "react";
import { User } from "../Login/Login.type";

export interface ReportList {
  report_id: number;
  subject: string;
  content: string;
  created_at: Date;
  created_by_user_id: number;
  recipient_user_id: number;
  recipient: Recipient;
}

export interface Recipient {
  username: string;
}

export interface ReportListFormData {
  subject: string;
  content: string;
  recipient_kepsek_username: string;
}

export interface ReportListViewProps {
  user: User | null;
  reportlists: ReportList[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  editingReportList: ReportList | null;
  formData: ReportListFormData;
  setFormData: Dispatch<SetStateAction<ReportListFormData>>;

  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  openCreateDialog: () => void;
  openEditDialog: (reportlist: ReportList) => void;
  handleDeleteReportList: (faceId: string) => void;
}

export interface PostReportListResponse {
  message: string;
  report: Report;
}

export interface Report {
  report_id: number;
  subject: string;
  content: string;
  created_at: Date;
  created_by_user_id: number;
  recipient_user_id: number;
}
