import React, { FC } from "react";
import { AlertCardViewProps } from "./AlertCard.type";
import { ChevronRight } from "lucide-react";

const AlertCardView: FC<AlertCardViewProps> = ({
  icon,
  title,
  description,
  onButtonClick,
  buttonText,
}) => {
  return (
    <div className="flex flex-row w-full h-[98px] bg-white rounded-2xl px-10 items-center justify-between">
      <div className="flex flex-row space-x-5">
        {icon}
        <div className="flex flex-col justify-center">
          <h3 className="text-[18px] font-medium text-[#FF3D3D]">{title}</h3>
          <p className="font-medium text-[#667085] text-[12px]">
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={onButtonClick}
        className="px-6 py-3 bg-[#4849FD] rounded-xl flex text-white font-medium text-[14px] justify-center items-center space-x-2 hover:bg-opacity-90 transition-colors"
      >
        <span>{buttonText}</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default AlertCardView;
