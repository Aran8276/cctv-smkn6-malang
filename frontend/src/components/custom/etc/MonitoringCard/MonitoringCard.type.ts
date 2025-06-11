export interface MonitoringCardProps {
  cameraName: string;
  mjpegStreamUrl?: string;
  date?: string;
}

export interface GetHLSStreamResponse {
  img: string;
  url: string;
}
