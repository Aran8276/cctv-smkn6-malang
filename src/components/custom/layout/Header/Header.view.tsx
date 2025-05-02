import React, { FC } from "react";
import { HeaderProps } from "./Header.type";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

const HeaderView: FC<HeaderProps> = ({ heading, subheading, hasSearch }) => {
  return (
    <header className="flex space-x-12 items-center pb-8">
      <section className="flex gap-1 flex-col">
        <h3 className="font-semibold text-2xl">{heading}</h3>
        <p className="text-gray-500 text-sm">{subheading}</p>
      </section>
      {hasSearch && (
        <section>
          <div className="relative">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
            </div>
            <Input
              id="search"
              type="search"
              placeholder="Cari..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </section>
      )}
    </header>
  );
};

export default HeaderView;
