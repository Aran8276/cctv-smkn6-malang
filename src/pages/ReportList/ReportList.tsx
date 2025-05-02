"use client";

import React, { useState } from "react";
import ReportListView from "./ReportList.view";

export default function ReportList() {
  const [text] = useState("Hello");
  return <ReportListView text={text} />;
}
