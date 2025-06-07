import { CCTV } from "@/server-actions/CCTV/CCTV.type";

export interface MonitoringViewProps {
  cctvs: CCTV[];
}

export interface PostCCTVResponse {
  message: string;
  cctv: Cctv;
}

export interface Cctv {
  cctv_id: string;
  location: string;
  rtsp: string;
  status: string;
}
