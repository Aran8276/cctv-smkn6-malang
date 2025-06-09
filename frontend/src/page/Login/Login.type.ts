import { FormEvent } from "react";

export interface LoginViewProps {
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
