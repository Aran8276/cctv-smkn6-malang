// import React, { FC } from "react";
// import { HomeViewProps } from "./Home.type";
import Header from "@/components/custom/layout/Header";
import DashboardCard from "@/components/custom/etc/DashboardCard";
import { TrendingDown, TrendingUp, TriangleAlert, Users } from "lucide-react";
import DashboardChartCard from "@/components/custom/etc/DashboardChartCard/DashboardChartCard";
import Image from "next/image";
import DashboardClickableCard from "@/components/custom/etc/DashboardClickableCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MonitoringCard from "@/components/custom/etc/MonitoringCard";
import MonitoringCardTable from "@/components/custom/etc/MonitoringCard/Table/MonitoringCardTable";
import { Fragment } from "react";

const HomeView = () => {
  return (
    <>
      <Header
        heading="Selamat Datang John Cena"
        subheading="Pantau area secara real-time dengan deteksi AI."
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          heading="Total Siswa Dikenali"
          amount={40689}
          bottomText="8.5%"
          PrimaryIcon={Users}
          primaryIconColor="text-indigo-600"
          SecondaryIcon={TrendingUp}
          secondaryIconColor="text-green-500"
        />
        <DashboardCard
          heading="Total Siswa Tidak Dikenali"
          amount={40689}
          bottomText="8.5%"
          PrimaryIcon={Users}
          primaryIconColor="text-indigo-600"
          SecondaryIcon={TrendingDown}
          secondaryIconColor="text-red-500"
        />
        <DashboardCard
          heading="Total Laporan"
          amount={40689}
          bottomText="8.5%"
          PrimaryIcon={TriangleAlert}
          primaryIconColor="text-amber-500"
          SecondaryIcon={TrendingUp}
          secondaryIconColor="text-green-500"
        />

        <DashboardChartCard />

        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row space-x-12 text-white col-span-full md:col-span-3">
          <section className="relative w-full flex-1/50 h-fit">
            <Image
              className="rounded-xl"
              alt="preview"
              width={1280}
              height={720}
              src="/accord-executive.jpg"
            />
            <div className="absolute bottom-0 px-8 py-6 bg-gradient-to-t from-[#0000009a] rounded-b-xl to-[#0000] w-full">
              <h3 className="font-semibold text-lg">Camera 1</h3>
              <h3 className="font-semibold text">
                {new Date().toLocaleString()}
              </h3>
            </div>
          </section>

          <section className="flex-1 flex-col space-y-3">
            <DashboardClickableCard type="alert" />
            {["Camera 1", "Camera 2", "Camera 3", "Camera 4"].map(
              (item, index) => (
                <Fragment key={index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer hover:scale-[1.01] transition-all">
                        <DashboardClickableCard
                          type="camera"
                          cameraName={item}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="flex space-y-3 flex-col h-[600px] overflow-y-scroll">
                      <MonitoringCard cameraName={item} />
                      <section>
                        <DialogHeader className="flex flex-col space-y-3">
                          <DialogTitle>Daftar Laporan</DialogTitle>
                          <MonitoringCardTable />
                        </DialogHeader>
                      </section>
                    </DialogContent>
                  </Dialog>
                </Fragment>
              )
            )}
          </section>
        </div>
      </section>
    </>
  );
};

export default HomeView;
