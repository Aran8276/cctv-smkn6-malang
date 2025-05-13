import React, { FC } from "react";
import { SettingsViewProps } from "./Settings.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";

const SettingsView: FC<SettingsViewProps> = () => {
  return (
    <>
      <Header heading="Setelan" />
      <BreadcrumbString value="Beranda/Setelan" />
    </>
  );
};

export default SettingsView;
