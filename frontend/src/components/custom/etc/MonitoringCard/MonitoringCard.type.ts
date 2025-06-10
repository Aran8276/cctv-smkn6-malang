export interface MonitoringCardProps {
  playerRef?: React.RefObject<HTMLVideoElement | null>;
  cameraName: string;
  hlsStreamUrl?: string;
  date?: string;
}

export interface GetHLSStreamResponse {
  img: string;
  url: string;
}
