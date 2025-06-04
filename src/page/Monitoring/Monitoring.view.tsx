import React, { FC, Fragment } from "react";
import { MonitoringViewProps } from "./Monitoring.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import MonitoringCard from "@/components/custom/etc/MonitoringCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MonitoringCardTable from "@/components/custom/etc/MonitoringCard/Table/MonitoringCardTable";

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
          <Fragment key={index}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer hover:scale-[1.01] transition-all">
                  <MonitoringCard key={index} cameraName={item} />
                </div>
              </DialogTrigger>
              <DialogContent className="flex space-y-3 flex-col h-[600px] overflow-y-scroll">
                <MonitoringCard key={index} cameraName={item} />
                <section>
                  <DialogHeader className="flex flex-col space-y-3">
                    <DialogTitle>Daftar Laporan</DialogTitle>
                    <MonitoringCardTable />
                  </DialogHeader>
                </section>
              </DialogContent>
            </Dialog>
          </Fragment>
        ))}
      </section>
    </>
  );
};

export default MonitoringView;
