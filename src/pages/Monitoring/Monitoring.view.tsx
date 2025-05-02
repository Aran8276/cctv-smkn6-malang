import React, { FC } from "react";
import { MonitoringViewProps } from "./Monitoring.type";
import Header from "@/components/custom/layout/Header";

const MonitoringView: FC<MonitoringViewProps> = () => {
  return (
    <>
      <Header hasSearch heading="Pemantauan" />
    </>
  );
};

export default MonitoringView;
