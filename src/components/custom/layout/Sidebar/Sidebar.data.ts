import {
  Bell,
  ClipboardList,
  History,
  LayoutGrid,
  Settings,
  Webcam,
} from "lucide-react";

export const navItemsSecurity = [
  {
    title: "Beranda",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Pemantauan",
    url: "/monitoring",
    icon: Webcam,
  },
  {
    title: "Laporan",
    url: "/report-list",
    icon: ClipboardList,
  },
  {
    title: "Riwayat",
    url: "/history",
    icon: History,
  },
];

export const navItemsAdmin = [
  {
    title: "Beranda",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Pemantauan",
    url: "/monitoring",
    icon: Webcam,
  },
  {
    title: "Data User",
    url: "/user-data",
    icon: Webcam,
  },
  {
    title: "Dataset",
    url: "/dataset",
    icon: Webcam,
  },
  {
    title: "Laporan",
    url: "/report-list",
    icon: ClipboardList,
  },
  {
    title: "Riwayat",
    url: "/history",
    icon: History,
  },
];

export const navItemsKepsek = [
  {
    title: "Beranda",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Pemantauan",
    url: "/monitoring",
    icon: Webcam,
  },
  {
    title: "Laporan",
    url: "/report-list",
    icon: ClipboardList,
  },
  {
    title: "Riwayat",
    url: "/history",
    icon: History,
  },
];

export const secondaryNavItems = [
  {
    title: "Notifikasi",
    url: "/alerts",
    icon: Bell,
  },
  {
    title: "Setelan",
    url: "/settings",
    icon: Settings,
  },
];
