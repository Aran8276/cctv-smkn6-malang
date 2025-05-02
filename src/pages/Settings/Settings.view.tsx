import React, { FC } from "react";
import { SettingsViewProps } from "./Settings.type";
import Header from "@/components/custom/layout/Header";

const SettingsView: FC<SettingsViewProps> = () => {
  return (
    <>
      <Header heading="Setelan" />
    </>
  );
};

export default SettingsView;
