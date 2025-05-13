"use client";

import React, { useState } from "react";
import MonitoringView from "./Monitoring.view";

export default function Monitoring() {
  const [text] = useState("Hello");
  return <MonitoringView text={text} />;
}
