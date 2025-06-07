import { Table } from "@tanstack/react-table";

export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  created_at: Date;
}

export interface UserFormData {
  username: string;
  email: string;
  password?: string;
  role: string;
}
export interface UserDataViewProps {
  table: Table<User>;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  editingUser: User | null;
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  openCreateDialog: () => void;
}
