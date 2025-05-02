import React, { FC } from "react";
import { AlertsViewProps } from "./Alerts.type";
import Header from "@/components/custom/layout/Header";

const AlertsView: FC<AlertsViewProps> = () => {
  return (
    <>
      <Header hasSearch heading="Notifikasi" />
    </>
  );
};

export default AlertsView;
