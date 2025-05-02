import React, { FC } from "react";
import { HistoryViewProps } from "./History.type";
import Header from "@/components/custom/layout/Header";

const HistoryView: FC<HistoryViewProps> = () => {
  return (
    <>
      <Header hasSearch heading="Riwayat" />
    </>
  );
};

export default HistoryView;
