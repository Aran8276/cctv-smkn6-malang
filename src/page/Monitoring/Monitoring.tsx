"use client";

import React, { useEffect, useState } from "react";
import MonitoringView from "./Monitoring.view";
import { CCTV } from "@/server-actions/CCTV/CCTV.type";
import { client } from "@/utils/client";
import { AxiosError } from "axios";
import { PostCCTVResponse } from "./Monitoring.type";

export default function Monitoring() {
  const [cctvs, setCCTV] = useState<CCTV[]>([]);

  const fetchCCTVS = async () => {
    try {
      const res: CCTV[] = (await client.get("/api/cctv")).data;
      setCCTV(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  };

  const postCCTV = async () => {
    try {
      const res: PostCCTVResponse = (await client.post("/api/cctv")).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  };

  useEffect(() => {
    fetchCCTVS();
  }, []);

  return <MonitoringView cctvs={cctvs} />;
}
