import React from "react";
import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  color?: string;
}

export default function Spinner({ color = "bg-custom200" }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        "w-6 h-6 rounded-full bg-custom300 flex items-center justify-center relative before:content-[''] before:absolute before:w-2 before:h-2 before:left-0 after:content-[''] after:absolute after:w-2 after:h-2 after:right-0 animate-spin",
        "after:" + color + " before:" + color
      )}
    >
      <div
        className={twMerge("w-5 h-5 rounded-full bg-custom200", color)}
      ></div>
    </div>
  );
}
