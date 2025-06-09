import { CCTV } from "@/server-actions/CCTV/CCTV.type";
import { Dispatch, FormEvent, SetStateAction } from "react";

export interface MonitoringViewProps {
  cctvActiveData: ActiveCctv | null;
  setCctvActiveId: Dispatch<SetStateAction<string>>;
  postCCTV: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  deleteCCTV: (id: string) => Promise<void>;
  cctvs: CCTV[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PostCCTVResponse {
  message: string;
  cctv: Cctv;
}

export interface DeleteCCTVResponse {
  message: string;
  cctv: Cctv;
}

export interface Cctv {
  cctv_id: string;
  location: string;
}

export interface Cctv {
  cctv_id: string;
  location: string;
  rtsp: string;
  status: string;
}

export interface ActiveCctv {
  cctv_id: string;
  location: string;
  rtsp: string;
  status: string;
}
