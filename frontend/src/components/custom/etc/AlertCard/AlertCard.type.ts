import { ReactNode } from "react";

export interface AlertCardViewProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export interface AlertCardProps extends AlertCardViewProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}
