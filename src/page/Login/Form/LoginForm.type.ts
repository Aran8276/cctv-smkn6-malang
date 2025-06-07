import { FormEvent } from "react";

export interface LoginFormType {
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
}
