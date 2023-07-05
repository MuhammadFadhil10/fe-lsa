import * as React from "react";
import { LoadingSpinner } from "..";

interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent) => void;
  loading?: boolean;
}

export const Button = React.memo(function Button({
  text,
  type = "submit",
  onClick,
  loading = false,
}: Props) {
  return (
    <button
      type={type}
      className="text-white flex justify-center mt-5 w-full bg-primary  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={onClick}
      disabled={loading}
    >
      {!loading ? text : <LoadingSpinner />}
    </button>
  );
});
