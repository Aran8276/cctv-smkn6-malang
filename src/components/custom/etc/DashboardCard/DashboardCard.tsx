"use client";

import React, { FC } from "react";
import DashboardCardView from "./DashboardCard.view";
import { DashboardCardProps } from "./DashboardCard.type";

const DashboardCard: FC<DashboardCardProps> = ({
  heading,
  amount,
  bottomText,
}) => {
  return (
    <DashboardCardView
      heading={heading}
      amount={amount}
      bottomText={bottomText}
    />
  );
};

export default DashboardCard;
