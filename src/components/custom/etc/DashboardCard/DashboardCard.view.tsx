import React, { FC } from "react";
import { DashboardCardProps } from "./DashboardCard.type";
import { Card, CardContent } from "@/components/ui/card";

const DashboardCardView: FC<DashboardCardProps> = ({
  heading,
  amount,
  bottomText,
}) => {
  return (
    <Card>
      <CardContent className="flex space-y-4 flex-col">
        <p>{heading}</p>
        <h2 className="font-bold text-2xl">{amount.toLocaleString()}</h2>
        <p>{bottomText}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCardView;
