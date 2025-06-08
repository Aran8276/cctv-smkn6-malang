import React, { FC, useState, useEffect } from "react";

import ReactPlayer from "react-player/lazy";

interface MonitoringCardViewProps {
  cameraName: string;
  hlsStreamUrl: string;
}

const MonitoringCardView: FC<MonitoringCardViewProps> = ({
  cameraName,
  hlsStreamUrl,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full text-white h-[350px] bg-black rounded-xl">
      {/* The Video Player */}
      <div className="player-wrapper w-full h-full">
        {isClient && (
          <iframe
            src={hlsStreamUrl}
            className="w-full h-full rounded-xl overflow-hidden"
          />
        )}
      </div>

      <div className="absolute bottom-0 px-8 py-6 bg-gradient-to-t from-[#0000009a] rounded-b-xl to-[#0000] w-full pointer-events-none">
        <h3 className="font-semibold text-lg">{cameraName}</h3>
        <h3 className="font-semibold text">{new Date().toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default MonitoringCardView;
