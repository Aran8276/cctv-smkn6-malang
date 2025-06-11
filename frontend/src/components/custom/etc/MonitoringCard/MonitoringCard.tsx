// MonitoringCard.tsx (The container component)

"use client";

import React, { FC } from "react";
import MonitoringCardView from "./MonitoringCard.view";
import { MonitoringCardProps } from "./MonitoringCard.type";
const MonitoringCard: FC<MonitoringCardProps> = ({
  cameraName,
  mjpegStreamUrl,
}) => {
  return (
    <MonitoringCardView
      cameraName={cameraName}
      mjpegStreamUrl={mjpegStreamUrl}
    />
  );
};

export default MonitoringCard;
