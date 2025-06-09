"use client";

import React, { useState } from "react";
import HistoryView from "./History.view";
import { HistoryTableContext } from "./Table/HistoryTable.context";

export default function History() {
  const [search, setSearch] = useState("");
  return (
    <HistoryTableContext.Provider value={{ search }}>
      <HistoryView setSearch={setSearch} />
    </HistoryTableContext.Provider>
  );
}
