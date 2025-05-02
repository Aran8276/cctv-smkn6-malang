import React, { FC } from "react";
import { DashboardCardProps } from "./DashboardCard.type";
import { Card, CardContent } from "@/components/ui/card";

const DashboardCardView: FC<DashboardCardProps> = ({
  heading,
  amount,
  bottomText,
  PrimaryIcon,
  SecondaryIcon,
  primaryIconColor,
  secondaryIconColor,
}) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
        <section className="flex space-y-4 flex-col">
          <p>{heading}</p>
          <h2 className="font-bold text-2xl">{amount.toLocaleString()}</h2>
          <p className="flex items-center gap-3">
            {<SecondaryIcon className={secondaryIconColor} />}
            {secondaryIconColor === "text-green-500" ? (
              <span>
                <span className="text-green-500">{bottomText} </span>
                <span>from yesterday</span>
              </span>
            ) : (
              <span>
                <span className="text-red-500">{bottomText} </span>
                <span>from yesterday</span>
              </span>
            )}
          </p>
        </section>

        <section className="pr-3">
          <div className="bg-indigo-100 p-6 rounded-3xl">
            {<PrimaryIcon className={primaryIconColor} size={40} />}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default DashboardCardView;
