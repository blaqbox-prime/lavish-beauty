import React, { ReactElement, ReactNode } from "react";

function ActionCard({
  title = "Action",
  icon,
  onClick,
}: {
  title?: string;
  icon?: React.JSX.Element;
  onClick?: () => void;
}) {
  return (
    <div
      className="group flex my-2 relative flex-col items-left gap-8 font-semibold text-white bg-amber-700 hover:bg-amber-700 transition-all overflow-hidden hover:shadow-md hover:shadow-amber-800 rounded-lg p-4 text-ellipsis"
      onClick={onClick}
    >
      <div className="scale-75 group-hover:animate-bounce self-start transition-all">{icon && icon}</div>
      <h4>{title}</h4>

      <div className="scale-[9] absolute self-start bottom-0 right-0 opacity-5 transition-all group-hover:opacity-10">{icon && icon}</div>

    </div>
  );
}

export default ActionCard;
