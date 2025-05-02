"use client";

import React, { FC } from "react";
import DashboardCardView from "./DashboardCard.view";
import { DashboardCardProps } from "./DashboardCard.type";

const DashboardCard: FC<DashboardCardProps> = ({
  heading,
  amount,
  bottomText,
  PrimaryIcon,
  SecondaryIcon,
  primaryIconColor,
  secondaryIconColor,
}) => {
  return (
    <DashboardCardView
      heading={heading}
      amount={amount}
      bottomText={bottomText}
      PrimaryIcon={PrimaryIcon}
      SecondaryIcon={SecondaryIcon}
      primaryIconColor={primaryIconColor}
      secondaryIconColor={secondaryIconColor}
    />
  );
};

export default DashboardCard;
