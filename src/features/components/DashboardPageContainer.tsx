import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export const DashboardPageContainer = React.memo(
  function DashboardPageContainer({ children }: Props) {
    return (
      <div className="flex fixed top-[80px]  items-start justify-end h-screen w-screen rounded dark:bg-gray-800">
        <div className="w-[80vw] flex justify-center  p-2">{children}</div>
      </div>
    );
  }
);
