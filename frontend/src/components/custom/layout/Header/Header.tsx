"use client";

import React, { FC } from "react";
import HeaderView from "./Header.view";
import { HeaderProps } from "./Header.type";

const Header: FC<HeaderProps> = ({ heading, subheading, children }) => {
  return (
    <HeaderView heading={heading} subheading={subheading}>
      {children}
    </HeaderView>
  );
};

export default Header;
