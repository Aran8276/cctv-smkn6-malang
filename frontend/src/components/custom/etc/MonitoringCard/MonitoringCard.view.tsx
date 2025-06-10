import { Webcam } from "lucide-react";

import React, { FC, RefObject } from "react";
import ReactHlsPlayer from "react-hls-player";
import { MonitoringCardProps } from "./MonitoringCard.type";

const MonitoringCardView: FC<MonitoringCardProps> = ({
  cameraName,
  hlsStreamUrl,
  playerRef,
}) => {
  return (
    <div className="relative w-full text-white h-[350px] bg-black rounded-xl">
      <div className="player-wrapper w-full h-full">
        {hlsStreamUrl ? (
          <ReactHlsPlayer
            playerRef={playerRef as RefObject<HTMLVideoElement>}
            src={hlsStreamUrl}
            className="w-full h-full rounded-xl overflow-hidden"
            autoPlay
            muted
            controls
          />
        ) : (
          <div className="flex flex-col justify-center w-full h-full items-center rounded-xl overflow-hidden">
            <Webcam className="size-[150px] opacity-50" />
            <p className="mt-4 text-gray-400">No video stream available</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 px-8 py-6 bg-gradient-to-t from-[#000000bb] rounded-b-xl to-[#0000] w-full pointer-events-none">
        <h3 className="font-semibold text-lg">{cameraName}</h3>
        <p className="text-sm text-gray-300">{new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MonitoringCardView;
