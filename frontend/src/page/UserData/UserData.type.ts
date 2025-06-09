import { Dispatch, SetStateAction } from "react";

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
  users: User[];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  editingUser: User | null;
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  openCreateDialog: () => void;
  openEditDialog: (user: User) => void;
  handleDeleteUser: (userId: number) => Promise<void>;
}
