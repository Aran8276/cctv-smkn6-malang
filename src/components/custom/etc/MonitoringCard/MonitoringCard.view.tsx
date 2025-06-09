import { Webcam } from "lucide-react";
import React, { FC } from "react";

interface MonitoringCardViewProps {
  cameraName: string;
  hlsStreamUrl?: string;
}

const MonitoringCardView: FC<MonitoringCardViewProps> = ({
  cameraName,
  hlsStreamUrl,
}) => {
  return (
    <div className="relative w-full text-white h-[350px] bg-black rounded-xl">
      <div className="player-wrapper w-full h-full">
        {hlsStreamUrl ? (
          <iframe
            src={hlsStreamUrl}
            className="w-full h-full rounded-xl overflow-hidden"
          />
        ) : (
          <div className="flex justify-center w-full h-full items-center rounded-xl overflow-hidden">
            <Webcam className="size-[150px]" />
          </div>
        )}
      </div>

      {!hlsStreamUrl && (
        <div className="absolute bottom-0 px-8 py-6 bg-gradient-to-t from-[#0000009a] rounded-b-xl to-[#0000] w-full pointer-events-none">
          <h3 className="font-semibold text-lg">{cameraName}</h3>
          <h3 className="font-semibold text">{new Date().toLocaleString()}</h3>
        </div>
      )}
    </div>
  );
};

export default MonitoringCardView;
