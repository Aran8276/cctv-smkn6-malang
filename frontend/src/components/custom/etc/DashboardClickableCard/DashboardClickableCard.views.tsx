import React, { FC } from "react";
import { DashboardClickableCardProps } from "./DashboardClickableCard.type";
import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert, Video } from "lucide-react";

export const DashboardCameraCardView: FC<DashboardClickableCardProps> = ({
  cameraName,
}) => {
  return (
    <Card className="py-8 text-primary cursor-pointer transition-all hover:bg-gray-50">
      <CardContent className="flex items-center space-x-4">
        <Video />
        <h5 className="font-semibold">{cameraName}</h5>
      </CardContent>
    </Card>
  );
};

export const DashboardAlertCardView: FC<DashboardClickableCardProps> = ({}) => {
  return (
    <Card className="bg-[#FF3D3D] text-white py-8 cursor-pointer transition-all hover:bg-red-500">
      <CardContent className="flex items-center space-x-4">
        <TriangleAlert />
        <h5 className="font-semibold">Laporan</h5>
      </CardContent>
    </Card>
  );
};
