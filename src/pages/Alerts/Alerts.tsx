"use client";

import React, { useState } from "react";
import AlertsView from "./Alerts.view";

export default function Alerts() {
  const [text] = useState("Hello");
  return <AlertsView text={text} />;
}
