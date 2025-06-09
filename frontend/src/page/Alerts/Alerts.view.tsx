import React, { FC } from "react";
import { AlertsViewProps } from "./Alerts.type";
import Header from "@/components/custom/layout/Header";
import BreadcrumbString from "@/components/custom/layout/BreadcrumbString";
import { CheckCircle, TriangleAlert } from "lucide-react";
import AlertCard from "@/components/custom/etc/AlertCard";

const AlertsView: FC<AlertsViewProps> = () => {
  const notificationsData = [
    {
      id: "1",
      icon: <TriangleAlert className="w-[60px] h-[60px] text-[#FF793F]" />,
      title: "Laporan Dari Security 1",
      description:
        "Security Telah melaporkan bahwasannya ada 3 orang tidak dikenal di sekolah ini",
      buttonText: "Lihat Detail Laporan",
      titleColor: "text-[#FF3D3D]",
      onButtonClick: () => console.log("Lihat Detail Laporan 1"),
    },
    {
      id: "2",
      icon: <CheckCircle className="w-[60px] h-[60px] text-green-500" />,
      title: "Pembayaran Berhasil",
      description: "Pembayaran SPP bulan ini telah berhasil dikonfirmasi.",
      buttonText: "Lihat Rincian",
      titleColor: "text-green-600",
      onButtonClick: () => console.log("Lihat Rincian Pembayaran"),
    },
  ];

  return (
    <>
      <Header heading="Notifikasi" />
      <BreadcrumbString value="Beranda/Notifikasi" />
      <section className="flex flex-col space-y-5">
        {notificationsData.length > 0 ? (
          notificationsData.map((alert) => (
            <AlertCard
              key={alert.id}
              icon={alert.icon}
              title={alert.title}
              description={alert.description}
              buttonText={alert.buttonText}
              onButtonClick={alert.onButtonClick}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            Tidak ada notifikasi saat ini.
          </div>
        )}
      </section>
    </>
  );
};

export default AlertsView;
