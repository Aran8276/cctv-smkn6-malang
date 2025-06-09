// MonitoringCard.tsx (The container component)

"use client";

import React, { FC, useEffect, useState } from "react";
import MonitoringCardView from "./MonitoringCard.view";
import {
  GetHLSStreamResponse,
  MonitoringCardProps,
} from "./MonitoringCard.type";
import { rtspClient } from "@/utils/client";
import { AxiosError } from "axios";

const MonitoringCard: FC<MonitoringCardProps> = ({ cameraName, rstpUrl }) => {
  const [hlsStreamUrl, setHlsStreamUrl] = useState("");

  const getHlsStream = async (payload: string) => {
    try {
      const res: GetHLSStreamResponse = (
        await rtspClient.post("/stream/player/post", {
          url: payload,
        })
      ).data;

      setHlsStreamUrl(res.url);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (rstpUrl) {
      getHlsStream(rstpUrl);
    }
  }, [rstpUrl]);

  useEffect(() => {
    console.log(rstpUrl);
  }, [rstpUrl]);

  return (
    <MonitoringCardView cameraName={cameraName} hlsStreamUrl={hlsStreamUrl} />
  );
};

export default MonitoringCard;
