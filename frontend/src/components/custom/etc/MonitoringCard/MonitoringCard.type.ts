export interface MonitoringCardProps {
  cameraName: string;
  rstpUrl?: string;
  date?: string;
}

export interface GetHLSStreamResponse {
  img: string;
  url: string;
}
