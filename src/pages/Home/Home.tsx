"use client";

import React, { useState } from "react";
import HomeView from "./Home.view";

export default function Home() {
  const [text] = useState("Content Goes Here");
  return <HomeView text={text} />;
}
