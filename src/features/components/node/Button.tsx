import * as React from "react";
import { LoadingSpinner } from "..";

interface Props {
  type?: "button" | "submit";
  variant?: "fill" | "outlined";
  id?: string;
  classname?: string;
  text: string;
  bgColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
}

export const Button = React.memo(function Button({
  type = "submit",
  variant = "fill",
  id = "",
  classname = "",
  text,
  bgColor,
  onClick,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <button
      id={id}
      type={type}
      className={` flex justify-center mt-5 w-full ${
        variant === "fill"
          ? disabled
            ? "bg-gray-500 text-black"
            : bgColor
            ? `bg-[${bgColor}] text-white`
            : "bg-primary text-white "
          : ""
      } 
      ${
        variant === "outlined"
          ? disabled
            ? "bg-gray-500"
            : bgColor
            ? `border-2 border-[${bgColor}] bg-transparent text-[${bgColor}] hover:bg-${bgColor}-200`
            : "border-2 border-primary bg-transparent text-primary"
          : ""
      }
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none dark:focus:ring-blue-800 
        ${classname}
      `}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {!loading ? text : <LoadingSpinner />}
    </button>
  );
});
