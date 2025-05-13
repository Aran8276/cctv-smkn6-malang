"use client";

import React, { FC } from "react";
import MonitoringCardView from "./MonitoringCard.view";
import { MonitoringCardProps } from "./MonitoringCard.type";

const MonitoringCard: FC<MonitoringCardProps> = ({ cameraName }) => {
  return <MonitoringCardView cameraName={cameraName} />;
};

export default MonitoringCard;
