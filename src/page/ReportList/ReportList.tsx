"use client";

import React, { useState } from "react";
import ReportListView from "./ReportList.view";
import { ReportListTableContext } from "./Table/ReportListTable.context";

export default function ReportList() {
  const [search, setSearch] = useState("");
  return (
    <ReportListTableContext.Provider value={{ search }}>
      <ReportListView setSearch={setSearch} />
    </ReportListTableContext.Provider>
  );
}
