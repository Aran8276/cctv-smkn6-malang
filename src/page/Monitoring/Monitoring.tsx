"use client";

import React, { FormEvent, useEffect, useState } from "react";
import MonitoringView from "./Monitoring.view";
import { CCTV } from "@/server-actions/CCTV/CCTV.type";
import { client } from "@/utils/client";
import { AxiosError } from "axios";
import { DeleteCCTVResponse, PostCCTVResponse } from "./Monitoring.type";

export default function Monitoring() {
  const [cctvs, setCCTV] = useState<CCTV[]>([]);
  const [open, setOpen] = useState(false);

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

  const postCCTV = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-expect-error fix later
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    try {
      const res: PostCCTVResponse = (await client.post("/api/cctv", payload))
        .data;

      if (res.cctv) {
        alert(JSON.stringify(res.cctv));
        setOpen(false);
        fetchCCTVS();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
        alert(JSON.stringify(error));
      }
    }
  };

  const deleteCCTV = async (id: string) => {
    try {
      const res: DeleteCCTVResponse = (await client.delete(`/api/cctv/${id}`))
        .data;

      if (res.cctv) {
        alert("Delete CCTV Success " + JSON.stringify(res.cctv));
        fetchCCTVS();
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCCTVS();
  }, []);

  return (
    <MonitoringView
      open={open}
      setOpen={setOpen}
      postCCTV={postCCTV}
      deleteCCTV={deleteCCTV}
      cctvs={cctvs}
    />
  );
}
