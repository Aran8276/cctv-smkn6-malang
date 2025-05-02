"use client";

import React, { useState } from "react";
import HistoryView from "./History.view";

export default function History() {
  const [text] = useState("Hello");
  return <HistoryView text={text} />;
}
