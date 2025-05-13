import React, { FC } from "react";
import { AlertsViewProps } from "./Alerts.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";

const AlertsView: FC<AlertsViewProps> = () => {
  return (
    <>
      <Header heading="Notifikasi" />
      <BreadcrumbString value="Beranda/Notifikasi" />
    </>
  );
};

export default AlertsView;
