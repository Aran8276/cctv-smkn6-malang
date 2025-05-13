import React, { FC } from "react";
import { HeaderProps } from "./Header.type";

const HeaderView: FC<HeaderProps> = ({
  heading,
  subheading,
  children,
}) => {
  return (
    <header className="flex space-x-12 items-center pb-8">
      <section className="flex gap-1 flex-col">
        <h3 className="font-semibold text-2xl">{heading}</h3>
        <p className="text-gray-500 text-sm">{subheading}</p>
      </section>
      <section>
        <div className="relative">{children}</div>
      </section>
    </header>
  );
};

export default HeaderView;
