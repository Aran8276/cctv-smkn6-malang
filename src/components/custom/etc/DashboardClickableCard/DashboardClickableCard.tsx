"use client";

import React, { FC } from "react";
import {
  DashboardAlertCardView,
  DashboardCameraCardView,
} from "./DashboardClickableCard.views";
import { DashboardClickableCardProps } from "./DashboardClickableCard.type";

const DashboardClickableCard: FC<DashboardClickableCardProps> = ({
  cameraName,
  type,
}) => {
  if (type === "camera") {
    return <DashboardCameraCardView cameraName={cameraName} type={type} />;
  } else if (type === "alert") {
    return <DashboardAlertCardView type={type} />;
  }
};

export default DashboardClickableCard;
