import React, { FC } from "react";
import { ReportListViewProps } from "./ReportList.type";
import Header from "@/components/custom/layout/Header";

const ReportListView: FC<ReportListViewProps> = () => {
  return (
    <>
      <Header hasSearch heading="Laporan" />
    </>
  );
};

export default ReportListView;
