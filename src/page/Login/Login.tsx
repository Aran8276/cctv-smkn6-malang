"use client";

import { FormEvent } from "react";
import LoginView from "./Login.view";
import { client } from "@/utils/client";
import { LoginResponse } from "./Login.type";
import { AxiosError } from "axios";

export default function Login() {
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-expect-error fix later
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    try {
      const res: LoginResponse = (await client.post("/api/auth/login", payload))
        .data;

      if (res.user) {
        alert("Login sukses (edit nti pakai modal layak)");
        location.replace("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        alert(JSON.stringify(error));
      }
    }
  };

  return <LoginView handleLogin={handleLogin} />;
}
