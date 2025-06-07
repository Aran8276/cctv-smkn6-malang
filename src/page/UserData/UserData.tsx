"use client";

import React, { useEffect, useState } from "react";
import UserDataView from "./UserData.view";
import { UserDataTableContext } from "./Table/UserDataTable.context";
import { User } from "./UserData.type";
import { AxiosError } from "axios";
import { client } from "@/utils/client";

export default function UserData() {
  const [search, setSearch] = useState("");
  const [users, setUser] = useState<User[]>([]);

  const fetchUserS = async () => {
    try {
      const res: User[] = (await client.get("/api/user")).data;
      setUser(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  };

  // const postUser = async () => {
  //   try {
  //     const res: PostUserResponse = (await client.post("/api/user")).data;
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       return error.response?.data;
  //     }
  //   }
  // };

  useEffect(() => {
    fetchUserS();
  }, []);

  return (
    <UserDataTableContext.Provider value={{ search }}>
      <UserDataView setSearch={setSearch} />
    </UserDataTableContext.Provider>
  );
}
