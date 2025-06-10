// MonitoringCard.tsx (The container component)

"use client";

import React, { FC, useRef } from "react";
import MonitoringCardView from "./MonitoringCard.view";
import { MonitoringCardProps } from "./MonitoringCard.type";
const MonitoringCard: FC<MonitoringCardProps> = ({
  cameraName,
  hlsStreamUrl,
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);

  return (
    <MonitoringCardView
      playerRef={playerRef}
      cameraName={cameraName}
      hlsStreamUrl={hlsStreamUrl}
    />
  );
};

export default MonitoringCard;
