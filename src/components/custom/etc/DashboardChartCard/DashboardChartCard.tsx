"use client";

import React, { useState } from "react";
import DashboardChartCardView from "./DashboardChartCard.view";

const DashboardChartCard = () => {
  const generateMonthlyData = () => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months.map((month) => ({
      label: month,
      value: Math.floor(Math.random() * 2800) + 200,
      accuracy: Math.floor(Math.random() * 50) + 50,
    }));
  };

  const generateDailyData = () => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const currentDayIndex = new Date().getDay();

    const orderedDays = [
      ...days.slice(currentDayIndex),
      ...days.slice(0, currentDayIndex),
    ];

    return orderedDays.map((day) => ({
      label: day,
      value: Math.floor(Math.random() * 2800) + 200,
      accuracy: Math.floor(Math.random() * 50) + 50,
    }));
  };

  // const generateHourlyData = () => {
  //   const currentHour = new Date().getHours();
  //   const hours = [];

  //   for (let i = 0; i < 13; i++) {
  //     const hour = (currentHour - 12 + i + 24) % 24;
  //     hours.push(`${hour.toString().padStart(2, "0")}:00`);
  //   }

  //   return hours.map((hour) => ({
  //     label: hour,
  //     value: Math.floor(Math.random() * 2800) + 200,
  //     accuracy: Math.floor(Math.random() * 50) + 50,
  //   }));
  // };

  const [timeRange, setSelected] = useState<
    "Harian" | "Mingguan" | "Bulanan" | string
  >("Bulanan");

  const chartData = React.useMemo(() => {
    switch (timeRange) {
      case "Harian":
        return generateDailyData();
      case "Mingguan":
        return generateDailyData();
      case "Bulanan":
      default:
        return generateMonthlyData();
    }
  }, [timeRange]);

  const options = ["Harian", "Mingguan", "Bulanan"];

  return (
    <DashboardChartCardView
      chartData={chartData}
      selected={timeRange}
      setSelected={setSelected}
      options={options}
    />
  );
};

export default DashboardChartCard;
