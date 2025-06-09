"use client";

import React, { useState } from "react";
import SettingsView from "./Settings.view";

export default function Settings() {
  const [text] = useState("Hello");
  return <SettingsView text={text} />;
}
