import React, { FC, Fragment } from "react";
import { BreadcrumbStringProps } from "./BreadcrumbString.type";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BreadcrumbStringView: FC<BreadcrumbStringProps> = ({ value }) => {
  return (
    <section className="w-fit mb-10">
      <div className="border-b-primary border-b-2 pb-2 px-3 w-full">
        <Breadcrumb>
          <BreadcrumbList>
            {value.split("/").map((item, index) =>
              index + 1 === value.split("/").length ? (
                <BreadcrumbItem key={-1}>
                  <BreadcrumbPage className="text-primary">
                    {item}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/">{item}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              )
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  );
};

export default BreadcrumbStringView;
