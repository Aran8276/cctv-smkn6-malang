"use client";

import React, { useState } from "react";
import UserDataView from "./UserData.view";
import { UserDataTableContext } from "./Table/UserDataTable.context";

export default function UserData() {
  const [search, setSearch] = useState("");
  return (
    <UserDataTableContext.Provider value={{ search }}>
      <UserDataView setSearch={setSearch} />
    </UserDataTableContext.Provider>
  );
}
