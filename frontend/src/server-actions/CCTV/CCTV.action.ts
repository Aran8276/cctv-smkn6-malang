"use server";

import { client } from "@/utils/client";
import { CCTV } from "./CCTV.type";
import { AxiosError } from "axios";

export const getCCTV = async (): Promise<CCTV[] | undefined> => {
  try {
    const res: CCTV[] = (await client.get("/api/cctv")).data;
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
  }
};
