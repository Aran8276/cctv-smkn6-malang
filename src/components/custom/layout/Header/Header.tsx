"use client";

import React, { FC } from "react";
import HeaderView from "./Header.view";
import { HeaderProps } from "./Header.type";

const Header: FC<HeaderProps> = ({ heading, subheading, hasSearch }) => {
  return (
    <HeaderView
      heading={heading}
      subheading={subheading}
      hasSearch={hasSearch}
    />
  );
};

export default Header;
