import React, { FC } from "react";
import { HomeViewProps } from "./Home.type";
import Header from "@/components/custom/layout/Header";
import DashboardCard from "@/components/custom/etc/DashboardCard";

const HomeView: FC<HomeViewProps> = () => {
  return (
    <>
      <Header
        heading="Selamat Datang John Cena"
        subheading="Pantau area secara real-time dengan deteksi AI."
      />
      <section className="grid grid-cols-3 gap-6">
        <DashboardCard
          heading="Total Siswa Dikenali"
          amount={40689}
          bottomText="Up from yesterday"
        />
        <DashboardCard
          heading="Total Siswa Tidak Dikenali"
          amount={40689}
          bottomText="Up from yesterday"
        />
        <DashboardCard
          heading="Total Laporan"
          amount={40689}
          bottomText="Up from yesterday"
        />

        
      </section>
    </>
  );
};

export default HomeView;
