"use client";

import React, { FC } from "react";
import BreadcrumbStringView from "./BreadcrumbString.view";
import { BreadcrumbStringProps } from "./BreadcrumbString.type";

const BreadcrumbString: FC<BreadcrumbStringProps> = ({ value }) => {
  return <BreadcrumbStringView value={value} />;
};

export default BreadcrumbString;
