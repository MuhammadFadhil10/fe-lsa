import { useAuth } from "@/features";
import * as React from "react";

export const DashboardHeader = React.memo(function DashboardHeader() {
  const { handleLogout } = useAuth();

  const user = JSON.parse(localStorage.getItem("user-loggedin") ?? "{}");

  return (
    <div
      id="sticky-banner"
      tabIndex={-1}
      className="bg-primary fixed top-0 left-0 px-5 z-50 flex justify-between w-full  border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      {/* brand */}
      <div className="flex items-center text-white text-2xl">
        <h1>Dashboard</h1>
      </div>

      <div>
        <p className="text-white" >
          {user?.name} {user.role === "teacher" && "(Guru)"}
        </p>
        <p className="text-[red] cursor-pointer" onClick={handleLogout}>
          Keluar
        </p>
      </div>
    </div>
  );
});
