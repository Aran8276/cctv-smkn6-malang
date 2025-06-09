import React, { FC } from "react";
import AlertCardView from "./AlertCard.view";
import { AlertCardProps } from "./AlertCard.type";

const AlertCard: FC<AlertCardProps> = (props) => {
  return <AlertCardView {...props}/>;
};

export default AlertCard;
