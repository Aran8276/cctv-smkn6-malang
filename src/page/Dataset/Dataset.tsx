"use client";

import React, { useState } from "react";
import DatasetView from "./Dataset.view";
import { DatasetTableContext } from "./Table/DatasetTable.context";

export default function Dataset() {
  const [search, setSearch] = useState("");
  return (
    <DatasetTableContext.Provider value={{ search }}>
      <DatasetView setSearch={setSearch} />
    </DatasetTableContext.Provider>
  );
}
