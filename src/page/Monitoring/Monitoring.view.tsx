import React, { FC } from "react";
import { MonitoringViewProps } from "./Monitoring.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import MonitoringCard from "@/components/custom/etc/MonitoringCard";

const MonitoringView: FC<MonitoringViewProps> = () => {
  return (
    <>
      <Header heading="Pemantauan" />
      <BreadcrumbString value="Beranda/Pemantauan" />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {[
          "Camera 1",
          "Camera 2",
          "Camera 3",
          "Camera 4",
          "Camera 5",
          "Camera 6",
        ].map((item, index) => (
          <MonitoringCard key={index} cameraName={item} />
        ))}
      </section>
    </>
  );
};

export default MonitoringView;
