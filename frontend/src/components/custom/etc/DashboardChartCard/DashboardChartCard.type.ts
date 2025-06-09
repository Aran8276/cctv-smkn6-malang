import { Dispatch } from "react";

export interface DashboardChartCardProps {
  chartData: {
    label: string;
    value: number;
    accuracy: number;
  }[];
  selected: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
  options: string[];
}
