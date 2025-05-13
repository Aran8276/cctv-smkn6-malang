import React, { FC } from "react";
import { MonitoringCardProps } from "./MonitoringCard.type";
import Image from "next/image";

const MonitoringCardView: FC<MonitoringCardProps> = ({ cameraName }) => {
  return (
    <div className="relative w-full text-white h-[350px]">
      <Image
        className="rounded-xl w-full h-full object-cover"
        alt="preview"
        width={500}
        height={300}
        src="/accord-executive.jpg"
      />
      <div className="absolute bottom-0 px-8 py-6 bg-gradient-to-t from-[#0000009a] rounded-b-xl to-[#0000] w-full">
        <h3 className="font-semibold text-lg">{cameraName}</h3>
        <h3 className="font-semibold text">{new Date().toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default MonitoringCardView;
