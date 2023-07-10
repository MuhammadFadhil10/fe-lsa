import { useDashboard } from "@/features";
import * as React from "react";

interface Props {
  name: string;
  size?: string;
  height?: string;
}

export const ProfilePicture = React.memo(function ProfilePicture({
  name,
  size = "40px",
}: Props) {
  const { handleGetInitialName } = useDashboard();
  const initial = handleGetInitialName(name);

  return (
    <div
      className={`w-[${size}] h-[${size}] rounded-full bg-[#068FFF] flex items-center justify-center px-2`}
    >
      <h1 className="font-bold text-xl text-white">{initial}</h1>
    </div>
  );
});
