import React from "react";
import { Button } from "@/components/ui/button";

interface MainButtonProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const MainButton: React.FC<MainButtonProps> = ({ children, className = "", icon }) => {
  return (
    <Button
      className={`cta-btn w-4/5 md:w-[300px] mx-auto p-4 h-12 bg-theme_primary text-dark font-bold hover:bg-accent_light rounded-full flex items-center justify-between ${className}`}
    >
      {icon && <span className="opacity-0 p-1 scale-125">{icon}</span>}
      {children}
      {icon && (
        <span className="bg-dark text-theme_primary rounded-full p-1 scale-125">
          {icon}
        </span>
      )}
    </Button>
  );
};

export default MainButton;